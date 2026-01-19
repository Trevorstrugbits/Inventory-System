import db from '../../db/db.service.js';
import { AppError } from '../../middleware/error.middleware.js';

interface CreateOrUpdateOverrideInput {
  companyId: string;
  variantId: number; // Integer ID
  quantity: number;
}

export class QuantityOverrideService {
  /**
   * Create or update a company's quantity override for a specific material variant.
   */
  async createOrUpdateOverride({ companyId, variantId, quantity }: CreateOrUpdateOverrideInput) {
    // 1. Find the material variant by its integer ID to get the UUID primary key
    const materialVariant = await db.prisma.materialVariant.findUnique({
      where: {
        variantId: variantId,
      },
    });

    if (!materialVariant) {
      throw new AppError(`Variant with ID ${variantId} not found`, 404);
    }

    // 2. Use the UUID (materialVariant.id) for the upsert operation
    const upsertedOverride = await db.prisma.companyQuantityOverride.upsert({
      where: {
        companyId_variantId: {
          companyId,
          variantId: materialVariant.id, // Use the string UUID
        },
      },
      update: {
        quantity,
      },
      create: {
        companyId,
        variantId: materialVariant.id, // Use the string UUID
        quantity,
      },
    });

    return upsertedOverride;
  }
}

export default new QuantityOverrideService();
