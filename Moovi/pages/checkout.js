// pages/checkout.js
import { useState } from 'react';
import Head from 'next/head';
import ShippingForm from '../components/ShippingForm';
import PaymentMethod from '../components/PaymentMethod';
import OrderSummary from '../components/OrderSummary';
import styles from '../styles/Checkout.module.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    cp: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // 1. Manejador de cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Manejador de cambio de método de pago
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // 3. Manejador de envío de formulario (simulado)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // **Validación simple de ejemplo (Debe ser más robusta)**
    if (!formData.nombre || !formData.email || !formData.direccion) {
      alert('Por favor, complete toda la información de envío.');
      return;
    }
    
    console.log('Datos de Envío:', formData);
    console.log('Método de Pago Seleccionado:', paymentMethod);
    alert(`Pedido finalizado! Se enviará a ${formData.direccion}.`);

    // Aquí se enviaría la data al Backend (API Route en Next.js)
  };

  return (
    <>
      <Head>
        <title>Checkout Básico - [Nombre de tu Tienda]</title>
      </Head>
      
      <div className={styles.body}>
        <div className={styles.checkoutContainer}>
          <div className={styles.mainContent}>
            <ShippingForm formData={formData} handleChange={handleFormChange} />
            <PaymentMethod paymentMethod={paymentMethod} handlePaymentChange={handlePaymentChange} />
          </div>
          
          <OrderSummary handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
