import db from '../../db/db.service.js';
import { User } from '@prisma/client';

class UsersService {
    /**
     * Get all users from database
     * @param select Optional fields to select
     * @returns Promise of array of users
     */
    async getAllUsers(select?: any): Promise<User[]> {
        return await db.findAll<User>('user', select);
    }

    /**
     * Get user by ID
     * @param id User ID
     * @param select Optional fields to select
     * @returns Promise of user or null if not found
     */
    async getUserById(id: string, select?: any): Promise<User | null> {
        return await db.findOne<User>('user', { id }, select);
    }

    /**
     * Get user by email
     * @param email User email
     * @param select Optional fields to select
     * @returns Promise of user or null if not found
     */
    async getUserByEmail(email: string, select?: any): Promise<User | null> {
        return await db.findFirst<User>('user', { email }, select);
    }

    /**
     * Get users by company ID with pagination
     * @param companyId Company ID
     * @param options Pagination options (page, limit)
     * @param select Optional fields to select
     * @returns Promise of paginated users
     */
    async getUsersByCompanyId(
        companyId: string,
        options: { page?: number; limit?: number } = {},
        select?: any,
        isEmployeeOnly?: boolean,
    ): Promise<{
        data: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }> {
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = { companyId: companyId.trim() };
        
        if (isEmployeeOnly) {
            where.role = 'EMPLOYEE';
        }

        // Get total count
        const total = await db.prisma.user.count({ where });

        // Get paginated data
        const data = await db.prisma.user.findMany({
            where,
            select,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });


        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    /**
     * Create a new user
     * @param data User data (email, name, companyId, locationId?)
     * @returns Created user
     */
    async createUser(data: {
        email: string;
        name: string;
        companyId: string;
        locationId?: string;
    }): Promise<User> {
        // Check if email already exists (outside transaction for faster check)
        const existingUser = await db.findFirst<User>('user', { email: data.email });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Split name into first and last name
        const nameParts = data.name.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Generate random password
        const passwordLength = 10;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Hash password
        const hashedPassword = await import('bcryptjs').then(m => m.hash(password, 10));

        // Create user in transaction (fast DB operation only)
        const newUser = await db.transaction<User>(async (tx: any) => {
            return await tx.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    companyId: data.companyId,
                    locationId: data.locationId,
                    role: 'EMPLOYEE',
                    isActive: true,
                }
            });
        });

        try {
            // Send email OUTSIDE transaction to avoid timeout
            const { sendNewUserCredentialsEmail } = await import('../../utils/email.util.js');

            // Fetch company name for email
            const company = await db.findOne<any>('company', { id: data.companyId }, { name: true });

            await sendNewUserCredentialsEmail({
                to: newUser.email,
                name: `${newUser.firstName} ${newUser.lastName}`,
                companyName: company?.name || 'ResinWerks',
                loginUrl: process.env.FRONTEND_URL || 'http://localhost:3000/login',
                password: password
            });

            return newUser;
        } catch (emailError) {
            // If email fails, rollback by deleting the created user
            await db.delete<User>('user', { id: newUser.id });

            console.error('Failed to send credentials email:', emailError);
            throw new Error('Failed to send credentials email. User creation rolled back. Please try again.');
        }
    }

    /**
     * Update user (Partial update)
     * @param id User ID
     * @param data Partial user data
     * @returns Updated user
     */
    async updateUser(id: string, data: Partial<User>): Promise<User> {
        // Prevent updating critical fields directly
        const { companyId, role, password, ...allowedUpdates } = data as any;

        // Fetch target user to check their current role
        const targetUser = await db.prisma.user.findUnique({ where: { id } });
        
        if (!targetUser) {
            throw new Error('User not found');
        }

        if (targetUser.role === 'COMPANY') {
            // Admin user's role and type are fixed
            delete allowedUpdates.employeeType;
        } else if (targetUser.role === 'EMPLOYEE') {
            // For employees, we allow updating employeeType (PRODUCTION_MANAGER <-> INSTALLER)
            // It will be in allowedUpdates already if passed in data
        }

        return await db.prisma.user.update({
            where: { id },
            data: allowedUpdates as any,
        });
    }

    /**
     * Delete user
     * @param id User ID
     * @returns Deleted user
     */
    async deleteUser(id: string): Promise<User> {
        return await db.delete<User>('user', { id });
    }
}

export default UsersService;