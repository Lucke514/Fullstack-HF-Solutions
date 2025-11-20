import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Product } from '@/shared/interfaces/product.interface';

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetail({ product, open, onOpenChange }: ProductDetailProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.title}</DialogTitle>
          <DialogDescription>ID: {product.id}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          {product.image && (
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-64 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300?text=Sin+Imagen';
                }}
              />
            </div>
          )}
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Precio</h3>
              <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Descripción</h3>
              <p className="text-sm">{product.description || 'Sin descripción'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Categoría</h3>
              <p className="text-sm">ID: {product.categoryId}</p>
            </div>
            {product.rating && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Calificación</h3>
                <p className="text-sm">
                  ⭐ {product.rating.rate}/5 ({product.rating.count} reseñas)
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
