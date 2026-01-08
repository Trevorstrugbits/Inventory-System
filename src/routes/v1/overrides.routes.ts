import express from 'express';
import Joi from 'joi';
import { authenticateToken } from '../../middleware/jwtAuth.js';
import { requireCompanyAdmin } from '../../middleware/rbac.js';
import { validate } from '../../middleware/validation.middleware.js';
import overridesController from '../../controllers/overrides/overrides.controller.js';

const router = express.Router();

const overrideSchema = Joi.object({
  variantId: Joi.number().integer().positive().required(),
  overageRate: Joi.number().min(0).required(),
});

// Create or update a company's overage override for a specific material variant
router.post(
  '/',
  authenticateToken,
  requireCompanyAdmin,
  validate(overrideSchema),
  overridesController.createOrUpdateOverride
);

export default router;
