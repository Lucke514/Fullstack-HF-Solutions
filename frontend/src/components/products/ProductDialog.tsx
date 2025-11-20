import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Plus, Pencil } from 'lucide-react';
import type { Product } from '@/shared/interfaces/product.interface';
import type { Category } from '@/shared/interfaces/categories.interface';
import { productSchema, type ProductFormData } from '@/shared/validations/products.validations';

// Definir los props para el componente ProductDialog
interface ProductDialogProps {
    product   ?: Product;
    categories : Category[];
    onSave     : (productData: Omit<Product, 'id'> | Partial<Product>, productId?: string) => Promise<void>;
    trigger   ?: React.ReactNode;
}

/**
 * @description Componente de dialogo para crear o editar un producto
 */
export function ProductDialog({ product, categories, onSave, trigger }: ProductDialogProps) {
    const [open, setOpen] = useState(false);

    // Inicializar el formulario
    const form = useForm<ProductFormData>({
        resolver     : zodResolver(productSchema),
        defaultValues: {
            title      : '',
            price      : 0,
            description: '',
            image      : '',
            categoryId : 0,
        },
    });

    // Efecto para resetear el formulario al abrir el dialogo
    useEffect(() => {
        if (open) {
            if (product) {
                form.reset({
                    title      : product.title,
                    price      : product.price,
                    description: product.description || '',
                    image      : product.image || '',
                    categoryId : product.categoryId,
                });
            } else {
                form.reset({
                    title      : '',
                    price      : 0,
                    description: '',
                    image      : '',
                    categoryId : 0,
                });
            }
        }
    }, [product, open, form]);

    // Evento submit
    const onSubmit = async (data: ProductFormData) => {
        try {
            // Construir el objeto de datos del producto
            const productData = {
                title      : data.title,
                price      : data.price,
                description: data.description || '',
                image      : data.image || '',
                categoryId : data.categoryId,
            };

            // En caso que sea edición o creación
            if (product) {
                await onSave(productData, product.id.toString());
                toast.success('Producto actualizado exitosamente');
            } else {
                await onSave(productData as Omit<Product, 'id'>);
                toast.success('Producto creado exitosamente');
            }

            setOpen(false);
            form.reset();
        } catch (error) {
            toast.error(product ? 'Error al actualizar el producto' : 'Error al crear el producto');
            console.error('Error al guardar producto:', error);
        }
    };

    const defaultTrigger = product ? (
        <Button variant   = "outline" size = "sm" className = "gap-2">
        <Pencil className = "h-4 w-4" />
            Editar
        </Button>
    ) : (
        <Button className = "gap-2">
        <Plus   className = "h-4 w-4" />
            Nuevo Producto
        </Button>
    );

    return (
        <Dialog open = {open} onOpenChange = {setOpen}>
            <DialogTrigger asChild>
                {trigger || defaultTrigger}
            </DialogTrigger>
            <DialogContent className = "sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit = {form.handleSubmit(onSubmit)} className = "space-y-4">
                        <FormField
                            control = {form.control}
                            name    = "title"
                            render  = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Título *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder = "Nombre del producto"
                                            {...field}
                                            disabled = {form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control = {form.control}
                            name    = "price"
                            render  = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type        = "number"
                                            step        = "0.01"
                                            min         = "0"
                                            placeholder = "0.00"
                                            {...field}
                                            onChange = {(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            value    = {field.value || ''}
                                            disabled = {form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control = {form.control}
                            name    = "categoryId"
                            render  = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría *</FormLabel>
                                    <Select
                                        onValueChange = {(value) => field.onChange(parseInt(value))}
                                        value         = {field.value ? field.value.toString() : ''}
                                        disabled      = {form.formState.isSubmitting}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder = "Selecciona una categoría" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key = {category.id} value = {category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control = {form.control}
                            name    = "description"
                            render  = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder = "Descripción del producto"
                                            rows        = {3}
                                            {...field}
                                            disabled = {form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control = {form.control}
                            name    = "image"
                            render  = {({ field }) => (
                                <FormItem>
                                    <FormLabel>URL de Imagen</FormLabel>
                                    <FormControl>
                                        <Input
                                            type        = "url"
                                            placeholder = "https://ejemplo.com/imagen.jpg"
                                            {...field}
                                            disabled = {form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type = "submit" disabled = {form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
