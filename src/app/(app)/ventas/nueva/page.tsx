'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { products, users } from '@/lib/data';

const saleSchema = z.object({
  product: z.string({ required_error: 'El producto es obligatorio.' }),
  quantity: z.coerce.number().int().min(1, 'La cantidad debe ser al menos 1.'),
  salesperson: z.string({ required_error: 'El vendedor es obligatorio.' }),
  customer: z.string().optional(),
  paymentMethod: z.string({ required_error: 'El método de pago es obligatorio.' }),
  finalPrice: z.coerce.number().positive('El precio final debe ser positivo.'),
  notes: z.string().optional(),
});

type SaleFormValues = z.infer<typeof saleSchema>;

export default function NewSalePage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      quantity: 1,
      customer: '',
      notes: '',
    },
  });

  function onSubmit(data: SaleFormValues) {
    console.log(data);
    toast({
      title: 'Venta Registrada',
      description: `La venta ha sido registrada con éxito.`,
    });
    router.push('/ventas');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto grid max-w-3xl flex-1 auto-rows-max gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nueva Venta</CardTitle>
              <CardDescription>
                Detalle de la transacción realizada. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="product"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Producto *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Busca y selecciona un producto" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {products.filter(p => p.stock > 0).map(p => (
                                    <SelectItem key={p.id} value={p.id}>
                                        {p.brand} {p.model} ({p.stock} en stock)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad *</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="salesperson"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vendedor *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecciona el empleado" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {users.map(u => (
                                    <SelectItem key={u.id} value={u.name}>{u.name}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="customer"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cliente (Nombre)</FormLabel>
                            <FormControl>
                            <Input placeholder="Nombre del cliente" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Método de Pago *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecciona un método" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Efectivo">Efectivo</SelectItem>
                                <SelectItem value="Tarjeta Crédito">Tarjeta de Crédito</SelectItem>
                                <SelectItem value="Transferencia">Transferencia</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="finalPrice"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio Final ($) *</FormLabel>
                            <FormControl>
                            <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <div>
                     <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Observaciones</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Notas sobre la venta o el cliente."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                    <Link href="/ventas">Cancelar</Link>
                </Button>
                <Button type="submit">Confirmar y Registrar Venta</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
