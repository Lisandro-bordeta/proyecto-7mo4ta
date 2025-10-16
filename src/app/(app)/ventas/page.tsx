import Link from 'next/link';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { sales } from '@/lib/data';
import type { Sale } from '@/lib/types';

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

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Registro de Ventas</h2>
          <p className="text-muted-foreground">
            Historial de todas las transacciones.
          </p>
        </div>
        <div className="flex items-center gap-2">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar por producto o cliente..." className="pl-8 sm:w-[300px]" />
            </div>
            <Link href="/ventas/nueva">
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Registrar Venta
                </Button>
            </Link>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Venta</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead className="hidden md:table-cell">Vendedor</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead>Estado Pago</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale: Sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>
                    {sale.product.model}
                    <div className="text-sm text-muted-foreground">x{sale.quantity}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{sale.salesperson}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(sale.date).toLocaleDateString('es-ES')}</TableCell>
                   <TableCell>
                    <Badge variant={sale.paymentStatus === 'Pagado' ? 'secondary' : 'outline'}>
                      {sale.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${sale.totalPrice.toLocaleString('es-ES')}</TableCell>
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
                        <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
                        <DropdownMenuItem>Marcar como Pagado</DropdownMenuItem>
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
            Mostrando <strong>1-{sales.length}</strong> de <strong>{sales.length}</strong> ventas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
