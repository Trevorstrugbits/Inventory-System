import { prisma } from '../../db/db.service.js';
import { hashPassword } from '../../utils/helpers.js';
import { deleteFromS3, uploadToS3 } from '../../utils/s3.util.js';
import crypto from 'crypto';

export class ProfileService {
    /**
     * Get user profile by ID
     */
    async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                profileImage: true,
                role: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    /**
     * Update user profile
     */
    async updateProfile(userId: string, data: any) {
        const { password, ...profileData } = data;

        // Handle password update
        if (password) {
            const hashedPassword = await hashPassword(password);
            profileData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: profileData,
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                profileImage: true,
                role: true,
            },
        });

        return updatedUser;
    }

    /**
     * Update user profile image
     */
    async updateProfileImage(userId: string, file: Express.Multer.File) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        // If user has an old profile image, delete it from S3
        if (user.profileImage) {
            try {
                // Extract key from URL
                const key = user.profileImage.split('/').pop();
                if (key) {
                    await deleteFromS3(key);
                }
            } catch (error) {
                // Log error but don't block update
                console.error(`Failed to delete old profile image from S3: ${error}`);
            }
        }
        
        // Upload new image to S3
        const fileExtension = file.originalname.split('.').pop();
        const newFileName = `${userId}-${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;
        const imageUrl = await uploadToS3(file, newFileName);

        // Update user's profileImage URL
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profileImage: imageUrl },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                profileImage: true,
                role: true,
            },
        });

        return updatedUser;
    }
}

export default new ProfileService();
