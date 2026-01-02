import { Request, Response, NextFunction } from 'express';
import materialsService, { MaterialsService } from '../../services/materials/materials.service.js';
import ApiResponse from '../../utils/response.js';

class MaterialsController {
    private materialsService: MaterialsService;

    constructor(materialsServiceInstance: MaterialsService = materialsService) {
        this.materialsService = materialsServiceInstance;
    }

    /**
     * Get base materials for dropdowns
     */
    getBaseMaterialsForDropdown = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const materials = await this.materialsService.getBaseMaterialsForDropdown();
            return res.status(200).json(ApiResponse.success(materials));
        } catch (error: any) {
            next(error);
        }
    }
}

export default new MaterialsController();
