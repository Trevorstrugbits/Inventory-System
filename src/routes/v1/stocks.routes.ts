import express from 'express';
import Joi from 'joi';
import stocksController from '../../controllers/stocks/stocks.controller.js';
import { authenticateToken } from '../../middleware/jwtAuth.js';
import { requireCompanyAdminOrSuperAdmin, requireEmployeeOrCompanyAdmin } from '../../middleware/rbac.js';
import { validate } from '../../middleware/validation.middleware.js';

const router = express.Router();

const projectionSchema = Joi.object({
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required().min(Joi.ref('start_date')),
  companyId: Joi.string().uuid().optional(),
});

const stockUpsertSchema = Joi.object({
  variantId: Joi.number().integer().positive().required(),
  inStock: Joi.number().min(0).required(),
  companyId: Joi.string().uuid().optional(),
});

// Get stock projection for a date range
router.get('/projection', authenticateToken, requireEmployeeOrCompanyAdmin, validate(projectionSchema, 'query'), stocksController.getStockProjection);

// Upsert stock quantity for a user's location
router.post('/', authenticateToken, requireCompanyAdminOrSuperAdmin, validate(stockUpsertSchema), stocksController.updateStock);

export default router;
