import { apiClient } from "@/config";
import type { Product } from "../interfaces/product.interface";

/**
 * @description Metodo para obtener la lista de productos
 */
export async function getProducts() : Promise<Product[]> {
    try {
        const response = await apiClient.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

/**
 * @description Metodo para eliminar un producto por su ID
 * @param id ID del producto
 * @return Boolean indicando si se eliminó correctamente
 */
export async function removeProduct(id: string) : Promise<Boolean> {
    try {
        const response = await apiClient.delete(`/products/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error(`Error al eliminar producto con id ${id}:`, error);
        throw error;
    }
}

/**
 * @description Metodo para modificar un producto por su ID
 * @param id ID del producto
 * @return Producto
 */
export async function updateProduct(id: string, productData: Partial<Product>) : Promise<Product> {
    try {
        const response = await apiClient.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar producto con id ${id}:`, error);
        throw error;
    }
}

/**
 * @description Metodo para crear un nuevo producto
 * @param productData Datos del producto
 * @return Producto creado
 */
export async function createProduct(productData: Omit<Product, 'id'>) : Promise<Product> {
    try {
        const response = await apiClient.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
}