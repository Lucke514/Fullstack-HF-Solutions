import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { CategoryDialog } from '@/components/categories/CategoryDialog';
import { CategoryList } from '@/components/categories/CategoryList';
import { ProductDialog } from '@/components/products/ProductDialog';
import { ProductList } from '@/components/products/ProductList';
import { ProductDetail } from '@/components/products/ProductDetail';
import type { Product } from '@/shared/interfaces/product.interface';

function App() {
    const { categories, loading: categoriesLoading, addCategory } = useCategories();
    const {
        products,
        loading: productsLoading,
        addProduct,
        editProduct,
        deleteProduct,
    } = useProducts();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product);
        setDetailOpen(true);
    };

    return (
        <div className="container mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Gestión de Productos y Categorías</h1>
            </header>

            {
                /** 
                 * @note Opte por usar tabs de shadcn para separar la gestión de productos y categorías dentro de una misma page sin perder la simplicidad de la interfaz
                */
            }
            <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="products">Productos</TabsTrigger>
                    <TabsTrigger value="categories">Categorías</TabsTrigger>
                </TabsList>

                {/* Seccion de productos */}
                <TabsContent value="products" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Productos</h2>
                        <ProductDialog
                            categories={categories}
                            onSave={async (data) => {
                                await addProduct(data as Omit<Product, 'id'>);
                            }}
                        />
                    </div>
                    <ProductList
                        products={products}
                        categories={categories}
                        loading={productsLoading}
                        onDeleteProduct={deleteProduct}
                        onEditProduct={async (data, id) => {
                            await editProduct(id, data);
                        }}
                        onViewProduct={handleViewProduct}
                    />
                </TabsContent>

                {/* Seccion de categorias */}
                <TabsContent value="categories" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Categorías</h2>
                        <CategoryDialog onCreateCategory={(name) => addCategory(name).then(() => { })} />
                    </div>
                    <CategoryList categories={categories} loading={categoriesLoading} />
                </TabsContent>
            </Tabs>

            <ProductDetail
                product={selectedProduct}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />
        </div>
    );
}

export default App;

