import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Trash2, Eye } from 'lucide-react';
import type { Product } from '@/shared/interfaces/product.interface';
import type { Category } from '@/shared/interfaces/categories.interface';
import { ProductDialog } from './ProductDialog';

  /**
 * @description Props del componente ProductList
 */
interface ProductListProps {
    products       : Product[];
    categories     : Category[];
    loading        : boolean;
    onDeleteProduct: (id: string) => Promise<void>;
    onEditProduct  : (productData: Partial<Product>, productId: string) => Promise<void>;
    onViewProduct  : (product: Product) => void;
}

  /**
 * @description Componente para listar productos
 * @param param0 
 * @returns 
 */
export function ProductList({
    products,
    categories,
    loading,
    onDeleteProduct,
    onEditProduct,
    onViewProduct,
}: ProductListProps) {
      // Inicializar estados para filtros y eliminación
    const [searchTerm, setSearchTerm]             = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [deletingId, setDeletingId]             = useState<string | null>(null);

      // Metodo para obtener el nombre de la categoría por su ID
    const getCategoryName = (categoryId: number) => {
        const category = categories.find((c) => c.id === categoryId);
        return category?.name || 'Sin categoría';
    };

      // Filtrar productos según términos de búsqueda y categoría seleccionada
    const filteredProducts = products.filter((product) => {
        const matchesSearch      = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory    = 
              selectedCategory === 'all' || product.categoryId === parseInt(selectedCategory);
        return matchesSearch && matchesCategory;
    });

      // Manejar eliminación de producto con el metodo nativo confirm 
    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            setDeletingId(id);
            try {
                await onDeleteProduct(id);
                toast.success('Producto eliminado exitosamente');
            } catch (error: unknown) {
                console.error('Error al eliminar producto:', error);
                toast.error('Error al eliminar el producto');
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <p className="text-muted-foreground">Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="search">Buscar por nombre</Label>
                    <Input
                        id="search"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category-filter">Filtrar por categoría</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger id="category-filter">
                            <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Lista de productos */}
            {filteredProducts.length === 0 ? (
                <div className="flex justify-center items-center py-12">
                    <p className="text-muted-foreground">
                        {products.length === 0
                            ? 'No hay productos disponibles'
                            : 'No se encontraron productos con los filtros aplicados'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        /**
                         * @note Me base en un mockup de shadcn para el diseño de las tarjetas y el view modal :)
                         * @link https://www.creative-tim.com/twcomponents/component/product-card-17
                         */
                        <Card key={product.id} className="flex flex-col">
                            <CardHeader>
                                {product.image && (
                                    <div className="mb-4 flex justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-40 object-contain rounded-md"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/200?text=Sin+Imagen';
                                            }}
                                        />
                                    </div>
                                )}
                                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="grow">
                                <div className="space-y-2">
                                    <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {product.description || 'Sin descripción'}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-semibold">Categoría:</span>{' '}
                                        {getCategoryName(product.categoryId)}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 gap-2"
                                    onClick={() => onViewProduct(product)}
                                >
                                    <Eye className="h-4 w-4" />
                                    Ver
                                </Button>
                                <ProductDialog
                                    product={product}
                                    categories={categories}
                                    onSave={(data) => onEditProduct(data as Partial<Product>, product.id.toString())}
                                />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(product.id.toString())}
                                    disabled={deletingId === product.id.toString()}
                                >
                                    {deletingId === product.id.toString() ? (
                                        '...'
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
