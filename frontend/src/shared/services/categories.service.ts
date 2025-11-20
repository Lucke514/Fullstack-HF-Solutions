import type { Category } from "../interfaces/categories.interface";
import { apiClient } from "@/config";

/**
 * @description Metodo para obtener la lista de categorias
 */
export async function getCategories() : Promise<Category[]> {
    try {
        const response = await apiClient.get("/category");
        return response.data;
    } catch (error) {
        console.error("Error al obtener categorias:", error);
        throw error;
    }
}

/**
 * @description Metodo para crear una nueva categoria
 * @param name Nombre de la categoria
 */
export async function createCategory(name: string) : Promise<Category> {
    try {
        const response = await apiClient.post("/category", { name });
        return response.data;
    } catch (error) {
        console.error("Error al crear categoria:", error);
        throw error;
    }
}