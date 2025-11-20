import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { categorySchema, type CategoryFormData } from '@/shared/validations/categories.validations';

// Definit los props para el componente CategoryDialog
interface CategoryDialogProps {
    onCreateCategory: (name: string) => Promise<void>;
}

/**
 * @description Componente de dialogo para crear una nueva categoria
 * @param param 0
 * @returns 
 */
export function CategoryDialog({ onCreateCategory }: CategoryDialogProps) {
    const [open, setOpen] = useState(false);

    // Inicializar el formulario
    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
        },
    });

    // Evento submit
    const onSubmit = async (data: CategoryFormData) => {
        try {
            await onCreateCategory(data.name);
            toast.success('Categoría creada exitosamente');
            form.reset();
            setOpen(false);
        } catch (error) {
            toast.error('Error al crear la categoría');
            console.error('Error al crear categoría:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nueva Categoría
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Categoría</DialogTitle>
                    <DialogDescription>
                        Ingresa el nombre de la nueva categoría.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ej: Electrónica, Ropa, etc."
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Creando...' : 'Crear Categoría'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
