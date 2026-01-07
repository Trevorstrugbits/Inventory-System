import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { AppError } from './error.middleware.js';

/**
 * Middleware to validate request data using Joi
 * @param schema Joi schema to validate against
 * @param source 'body', 'query', or 'params'
 */
export const validate = (schema: Schema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message.replace(/['"]/g, ''))
        .join(', ');
      
      return next(new AppError(`Validation error: ${errorMessage}`, 400));
    }

    // Replace the request data with the validated/stripped value
    // For 'query', we must modify the object in-place as it's getter-only.
    if (source === 'query') {
      // Clear existing query params and add the validated ones
      Object.keys(req.query).forEach(key => delete (req.query as any)[key]);
      Object.assign(req.query, value);
    } else {
      req[source] = value;
    }

    next();
  };
};
