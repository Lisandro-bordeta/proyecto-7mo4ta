import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SalesChart } from '@/components/sales-chart';
import { products, sales, salesByDay } from '@/lib/data';
import { DollarSign, Package, PackageX, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';

export default function DashboardPage() {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const monthlySales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock < 10
  );
  const latestSales = sales.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Moovi: La eficiencia se mueve contigo.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock} unidades</div>
            <p className="text-xs text-muted-foreground">
              Total de productos en inventario
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventas del Mes
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${monthlySales.toLocaleString('es-ES')}
            </div>
            <p className="text-xs text-muted-foreground">
              Ingresos totales del mes actual
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos por Agotarse
            </CardTitle>
            <PackageX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Productos con menos de 10 unidades
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevas Ventas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{latestSales.length}</div>
            <p className="text-xs text-muted-foreground">
              Ventas registradas hoy
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <SalesChart data={salesByDay} />
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Últimas 5 Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="font-medium">{sale.product.model}</div>
                      <div className="text-sm text-muted-foreground">
                        Vendido por {sale.salesperson}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${sale.totalPrice.toLocaleString('es-ES')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Productos por Agotarse</CardTitle>
            <CardDescription>
              Estos productos tienen bajo stock. Considera reabastecer pronto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product: Product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="font-medium">{product.brand} {product.model}</div>
                       <div className="text-sm text-muted-foreground">{product.color} - {product.capacity}</div>
                    </TableCell>
                    <TableCell className="text-right">
                       <Badge variant="destructive">{product.stock}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                 {lowStockProducts.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                            No hay productos con bajo stock.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
