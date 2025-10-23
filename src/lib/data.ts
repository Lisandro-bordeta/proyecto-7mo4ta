import type { Product, Sale, User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { methodGetList } from '@lib/functions/metodos/methodGetList'
import { methodGetListAuth } from '@lib/functions/metodos/methodGetListAuth'
let resp: any;

resp = await methodGetList("celulares");
const celulares = resp.data;
console.log(resp.message);
export const products: Product[] = celulares ?? [];


export const sales: Sale[] = [
  { id: 'V-001', date: '2024-05-21', product: { model: 'iPhone 15 Pro' }, quantity: 1, totalPrice: 1299, salesperson: 'Ana López', paymentStatus: 'Pagado', paymentMethod: 'Tarjeta Crédito' },
  { id: 'V-002', date: '2024-05-21', product: { model: 'Galaxy S24' }, quantity: 1, totalPrice: 1099, salesperson: 'Carlos Ruiz', paymentStatus: 'Pagado', paymentMethod: 'Efectivo' },
  { id: 'V-003', date: '2024-05-20', product: { model: 'Pixel 8 Pro' }, quantity: 2, totalPrice: 1998, salesperson: 'Ana López', paymentStatus: 'Pagado', paymentMethod: 'Transferencia' },
  { id: 'V-004', date: '2024-05-19', product: { model: 'Edge 40' }, quantity: 1, totalPrice: 550, salesperson: 'Laura Marín', paymentStatus: 'Pendiente', paymentMethod: 'Efectivo' },
  { id: 'V-005', date: '2024-05-18', product: { model: 'iPhone 15 Pro' }, quantity: 1, totalPrice: 1299, salesperson: 'Carlos Ruiz', paymentStatus: 'Pagado', paymentMethod: 'Tarjeta Crédito' },
  { id: 'V-006', date: '2024-05-17', product: { model: '13T Pro' }, quantity: 1, totalPrice: 799, salesperson: 'Ana López', paymentStatus: 'Pagado', paymentMethod: 'Efectivo' },
];

resp = await methodGetList("celulares");
const usuarios = resp.data;
console.log(resp.message);
export const users: User[] =  usuarios ?? [];
[
    { id: 'USR-001', name: 'Ana López', email: 'ana.lopez@moovi.com', role: 'Admin', lastAccess: '2024-05-21 10:30', avatarUrl: 'https://picsum.photos/seed/ana/40/40' },
    { id: 'USR-002', name: 'Carlos Ruiz', email: 'carlos.ruiz@moovi.com', role: 'Vendedor', lastAccess: '2024-05-21 09:15', avatarUrl: 'https://picsum.photos/seed/carlos/40/40' },
    { id: 'USR-003', name: 'Laura Marín', email: 'laura.marin@moovi.com', role: 'Vendedor', lastAccess: '2024-05-20 18:45', avatarUrl: 'https://picsum.photos/seed/laura/40/40' },
];

export const salesByDay = [
    { date: "2024-05-01", sales: 12 },
    { date: "2024-05-02", sales: 19 },
    { date: "2024-05-03", sales: 3 },
    { date: "2024-05-04", sales: 20 },
    { date: "2024-05-05", sales: 13 },
    { date: "2024-05-06", sales: 17 },
    { date: "2024-05-07", sales: 25 },
    { date: "2024-05-08", sales: 12 },
    { date: "2024-05-09", sales: 22 },
    { date: "2024-05-10", sales: 30 },
    { date: "2024-05-11", sales: 15 },
    { date: "2024-05-12", sales: 18 },
    { date: "2024-05-13", sales: 21 },
    { date: "2024-05-14", sales: 26 },
    { date: "2024-05-15", sales: 19 },
    { date: "2024-05-16", sales: 24 },
    { date: "2024-05-17", sales: 20 },
    { date: "2024-05-18", sales: 28 },
    { date: "2024-05-19", sales: 23 },
    { date: "2024-05-20", sales: 29 },
    { date: "2024-05-21", sales: 34 },
];
