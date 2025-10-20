import { PreferenciaMP } from '../services/mercadoPagoService';

const handleCheckout = async () => {
  const carrito = [
    { nombre: "Producto 1", cantidad: 2, precio: 1500 },
    { nombre: "Producto 2", cantidad: 1, precio: 2000 },
  ];

  const email = "cliente@correo.com";

  const result = await crearPreferenciaMP(carrito, email);

  if (result.success && result.init_point) {
    window.location.href = result.init_point; // Redirige a Mercado Pago
  } else {
    console.error("Error:", result.message);
  }
};
