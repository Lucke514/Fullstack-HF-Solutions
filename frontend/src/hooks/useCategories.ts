import { useState, useEffect } from 'react';
import { getCategories, createCategory } from '@/shared/services/categories.service';
import type { Category } from '@/shared/interfaces/categories.interface';

/**
 * @description Hook para gestionar categorías
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string) => {
    try {
      const newCategory = await createCategory(name);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError('Error al crear categoría');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
  };
}
