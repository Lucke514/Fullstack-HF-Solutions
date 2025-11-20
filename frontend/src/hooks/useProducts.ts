import { useState, useEffect } from 'react';
import {
    getProducts,
    createProduct,
    updateProduct,
    removeProduct
} from '@/shared/services/products.service';
import type { Product } from '@/shared/interfaces/product.interface';

/**
 * @description Hook para gestionar productos
 */
export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError('Error al cargar productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData: Omit<Product, 'id'>) => {
        try {
            const newProduct = await createProduct(productData);
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            setError('Error al crear producto');
            console.error(err);
            throw err;
        }
    };

    const editProduct = async (id: string, productData: Partial<Product>) => {
        try {
            const updatedProduct = await updateProduct(id, productData);
            setProducts(prev =>
                prev.map(p => p.id === Number(id) ? updatedProduct : p)
            );
            return updatedProduct;
        } catch (err) {
            setError('Error al actualizar producto');
            console.error(err);
            throw err;
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await removeProduct(id);
            setProducts(prev => prev.filter(p => p.id !== Number(id)));
        } catch (err) {
            setError('Error al eliminar producto');
            console.error(err);
            throw err;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        editProduct,
        deleteProduct,
    };
}
