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

// SupaBase
import { methodPost } from '@lib/functions/metodos/methodPost'

const productSchema = z.object({
  brand: z.string({ required_error: 'La marca es obligatoria.' }),
  model: z.string().min(1, 'El modelo es obligatorio.'),
  capacity: z.string({ required_error: 'La capacidad es obligatoria.' }),
  color: z.string().min(1, 'El color es obligatorio.'),
  costPrice: z.coerce.number().positive('El precio de costo debe ser positivo.'),
  salePrice: z.coerce.number().positive('El precio de venta debe ser positivo.'),
  initialStock: z.coerce.number().int().min(0, 'El stock no puede ser negativo.'),
  description: z.string().optional(),
  imageUrl: z.string().url('Debe ser una URL válida.').optional().or(z.literal('')),
  imei: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: undefined,
      model: '',
      capacity: undefined,
      color: '',
      costPrice: 0,
      salePrice: 0,
      initialStock: 0,
      description: '',
      imageUrl: '',
      imei: '',
    },
  });

  async function onSubmit(data: ProductFormValues) {
    const resp = await methodPost(data, "celulares"); // Enviar datos a supabase
    console.log(resp.message);
    console.log(data);
    toast({
      title: 'Producto Guardado',
      description: `El producto ${data.brand} ${data.model} ha sido guardado con éxito.`,
    });
    router.push('/inventario');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto grid max-w-5xl flex-1 auto-rows-max gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Cargar Nuevo Celular</CardTitle>
              <CardDescription>
                Ingresa los detalles del nuevo dispositivo. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una marca" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Apple">Apple</SelectItem>
                            <SelectItem value="Samsung">Samsung</SelectItem>
                            <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                            <SelectItem value="Motorola">Motorola</SelectItem>
                            <SelectItem value="Google">Google</SelectItem>
                            <SelectItem value="OnePlus">OnePlus</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: iPhone 15 Pro, Galaxy S24" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidad (GB/TB) *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona la capacidad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="128GB">128GB</SelectItem>
                            <SelectItem value="256GB">256GB</SelectItem>
                            <SelectItem value="512GB">512GB</SelectItem>
                            <SelectItem value="1TB">1TB</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Negro Medianoche, Azul Titán" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio de Costo ($) *</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio de Venta ($) *</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="initialStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Inicial *</FormLabel>
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
                        name="imageUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Imagen</FormLabel>
                            <FormControl>
                            <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imei"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>IMEI / Serial</FormLabel>
                            <FormControl>
                            <Input placeholder="Ingresa el IMEI" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Breve descripción y características clave."
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
                    <Link href="/inventario">Cancelar</Link>
                </Button>
                <Button type="submit">Guardar Producto</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
