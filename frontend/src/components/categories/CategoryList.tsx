import type { Category } from '@/shared/interfaces/categories.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
}

export function CategoryList({ categories, loading }: CategoryListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Cargando categorías...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">No hay categorías disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">ID: {category.id}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
