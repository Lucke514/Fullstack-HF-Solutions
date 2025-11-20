import { z } from 'zod';

/**
 * Schema de validación para productos
 */
export const productSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  price: z
    .number({ message: 'El precio debe ser un número' })
    .positive('El precio debe ser mayor a 0')
    .min(0.01, 'El precio mínimo es 0.01'),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  image: z
    .string()
    .refine((val) => val === '' || z.string().url().safeParse(val).success, {
      message: 'Debe ser una URL válida o dejar vacío',
    }),
  categoryId: z
    .number({ message: 'Debe seleccionar una categoría' })
    .positive('Debe seleccionar una categoría válida'),
});

export type ProductFormData = z.infer<typeof productSchema>;