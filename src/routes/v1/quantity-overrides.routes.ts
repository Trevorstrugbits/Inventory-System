import express from 'express';
import Joi from 'joi';
import { authenticateToken } from '../../middleware/jwtAuth.js';
import { requireCompanyAdmin } from '../../middleware/rbac.js';
import { validate } from '../../middleware/validation.middleware.js';
import quantityOverridesController from '../../controllers/quantity-overrides/quantity-overrides.controller.js';

const router = express.Router();

const quantityOverrideSchema = Joi.object({
  variantId: Joi.number().integer().positive().required(),
  quantity: Joi.number().min(0).required(),
});

// Create or update a company's quantity override for a specific material variant
router.post(
  '/',
  authenticateToken,
  requireCompanyAdmin,
  validate(quantityOverrideSchema),
  quantityOverridesController.createOrUpdateOverride
);

export default router;
