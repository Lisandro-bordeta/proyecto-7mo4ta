import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Inventario</h2>
          <p className="text-muted-foreground">
            Listado completo y búsqueda rápida de productos.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar por marca o modelo..." className="pl-8 sm:w-[300px]" />
            </div>
            <Link href="/inventario/nuevo">
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Producto
                </Button>
            </Link>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="hidden md:table-cell">Precio</TableHead>
                <TableHead className="hidden md:table-cell">Última Actualización</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                  <Image
                    src={product.imageUrl ?? "https://pwxpxouatzzxvvvszdnx.supabase.co/storage/v1/object/public/celImagen/place.jpg"}
                    alt={`Imagen de ${product.model}`}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    width="64"
                  />
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.brand} {product.model}
                    <div className="text-sm text-muted-foreground">{product.color} - {product.capacity}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
                      {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">${product.salePrice.toLocaleString('es-ES')}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(product.lastUpdate).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>1-{products.length}</strong> de <strong>{products.length}</strong> productos
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
