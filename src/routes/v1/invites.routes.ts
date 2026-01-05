import express from 'express';
import Joi from 'joi';
import inviteController from '../../controllers/invites/invite.controller.js';
import { authenticateToken } from '../../middleware/jwtAuth.js';
import { requireSuperAdmin } from '../../middleware/rbac.js';
import { validate } from '../../middleware/validation.middleware.js';

const router = express.Router();

// --- Validation Schemas ---

const createCompanyInviteSchema = Joi.object({
  companyName: Joi.string().required(),
  email: Joi.string().email().required(),
});

const acceptInviteSchema = Joi.object({
  token: Joi.string().required(),
  companyName: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().optional().allow(''),
  street: Joi.string().optional().allow(''),
  state: Joi.string().optional().allow(''),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  adminEmail: Joi.string().email().required(),
  adminPhone: Joi.string().optional().allow(''),
  password: Joi.string().min(8).required(),
});


// --- Superadmin Routes ---

router.post(
  '/company-invite', // Changed from /company-invite
  authenticateToken,
  requireSuperAdmin,
  validate(createCompanyInviteSchema),
  inviteController.createCompanyInvite
);

router.get(
  '/company', // To get pending invites
  authenticateToken,
  requireSuperAdmin,
  inviteController.getPendingInvites
);

router.delete(
  '/company/:inviteId', // To cancel an invite
  authenticateToken,
  requireSuperAdmin,
  inviteController.cancelInvite
);


// --- Public Routes ---

// Verify an invite token via a GET request with a URL parameter
router.get(
  '/verify/:token',
  inviteController.verifyInviteToken
);

// Accept an invite and onboard the company/admin
router.post(
  '/accept',
  validate(acceptInviteSchema),
  inviteController.acceptCompanyInvite
);

export default router;