import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './error.middleware.js';
/**
 * Middleware to verify JWT token and attach user to request
 */
export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new AppError('Access token is required', 401);
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError('Invalid token', 401));
        }
        else if (error instanceof jwt.TokenExpiredError) {
            next(new AppError('Token has expired', 401));
        }
        else {
            next(error);
        }
    }
};
/**
 * Optional authentication - doesn't throw error if no token
 */
export const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        // Silently fail for optional auth
        next();
    }
};
