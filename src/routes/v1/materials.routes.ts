import express from 'express';
import materialsController from '../../controllers/materials/materials.controller.js';
import { authenticateToken } from '../../middleware/jwtAuth.js';
import { requireRole } from '../../middleware/rbac.js';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Get Base Materials for Dropdowns
router.get('/base-products', 
    authenticateToken,
    requireRole(UserRole.SUPERADMIN, UserRole.COMPANY, UserRole.EMPLOYEE),
    materialsController.getBaseMaterialsForDropdown
);

export default router;
