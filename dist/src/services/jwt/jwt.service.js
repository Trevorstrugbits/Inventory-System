import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
class JwtService {
    /**
     * Generate access token
     * @param payload JWT payload with required companyId
     * @returns Access token (one day expiry)
     */
    generateAccessToken(payload) {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN,
        });
    }
    /**
     * Generate refresh token
     * @param payload JWT payload with required companyId
     * @returns Refresh token (7 days expiry)
     */
    generateRefreshToken(payload) {
        return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        });
    }
    /**
     * Verify refresh token
     * @param token Refresh token to verify
     * @returns Decoded JWT payload
     * @throws Error if token is invalid or expired
     */
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, env.JWT_REFRESH_SECRET);
        }
        catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Invalid refresh token');
            }
            else if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Refresh token has expired');
            }
            throw error;
        }
    }
    /**
     * Create access and refresh tokens for a user
     * @param user User object from database
     * @returns Object containing userId, accessToken (one day), and refreshToken (7 days)
     * @throws Error if user doesn't have companyId
     */
    async createTokens(user) {
        // Validate companyId is present
        if (!user.companyId) {
            throw new Error('Company ID is required for token generation');
        }
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
            locationId: user.locationId || undefined,
        };
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        return {
            userId: user.id,
            accessToken,
            refreshToken,
        };
    }
}
export default JwtService;
