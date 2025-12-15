import db from '../../db/db.service.js';
class UsersService {
    /**
     * Get all users from database
     * @param select Optional fields to select
     * @returns Promise of array of users
     */
    async getAllUsers(select) {
        return await db.findAll('user', select);
    }
    /**
     * Get user by ID
     * @param id User ID
     * @param select Optional fields to select
     * @returns Promise of user or null if not found
     */
    async getUserById(id, select) {
        return await db.findOne('user', { id }, select);
    }
    /**
     * Get user by email
     * @param email User email
     * @param select Optional fields to select
     * @returns Promise of user or null if not found
     */
    async getUserByEmail(email, select) {
        return await db.findFirst('user', { email }, select);
    }
}
export default UsersService;
