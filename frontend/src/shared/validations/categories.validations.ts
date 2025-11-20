import { z } from 'zod';

/**
 * Schema de validación para categorías
 */
export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
