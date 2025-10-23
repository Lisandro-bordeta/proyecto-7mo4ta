export type Product = {
  id: string;
  brand: string;
  model: string;
  capacity: '128GB' | '256GB' | '512GB' | '1TB';
  color: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  description?: string;
  imageUrl?: string | null;
  lastUpdate: string;
  imei?: string;
};

export type Sale = {
  id: string;
  date: string;
  product: Pick<Product, 'model' | 'imageUrl'>;
  quantity: number;
  totalPrice: number;
  salesperson: string;
  paymentStatus: 'Pagado' | 'Pendiente';
  paymentMethod: 'Efectivo' | 'Tarjeta Crédito' | 'Transferencia';
  customer?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Vendedor';
  last_sign_in_at: string;
  avatarUrl?: string;
};
