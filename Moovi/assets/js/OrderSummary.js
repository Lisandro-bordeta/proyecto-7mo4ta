// components/OrderSummary.js
import styles from '../styles/Checkout.module.css';

const MOCK_CART = [
  { name: 'Producto A', quantity: 1, price: 150.00, details: 'Color: Azul' },
  { name: 'Producto B', quantity: 2, price: 50.00, details: 'Talle: M' }, // Ajustado para que el total coincida (50 * 2 = 100)
];
const SHIPPING_COST = 25.00;

export default function OrderSummary({ handleSubmit }) {
  const subtotal = MOCK_CART.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalFinal = subtotal + SHIPPING_COST;

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sectionTitle}>Resumen del Pedido</h2>

      {MOCK_CART.map((item, index) => (
        <div key={index} className={styles.cartItem}>
          <div className={styles.itemDetails}>
            <strong>{item.name}</strong> (x{item.quantity})
            <span>{item.details}</span>
          </div>
          <div className={styles.itemPrice}>${(item.quantity * item.price).toFixed(2)}</div>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <div className={styles.totalsRow} style={{ borderTop: 'none', fontWeight: 'normal' }}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.totalsRow} style={{ fontWeight: 'normal' }}>
          <span>Envío</span>
          <span>${SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div className={styles.totalsRow + ' ' + styles.totalFinal}>
          <span>Total Final</span>
          <span>${totalFinal.toFixed(2)}</span>
        </div>
      </div>

      <button type="button" className={styles.btnConfirm} onClick={handleSubmit}>
        FINALIZAR PEDIDO
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '0.8em', color: '#777', marginTop: '15px' }}>
        Al hacer clic en "Finalizar Pedido", acepta nuestros{' '}
        <a href="/terminos" style={{ color: '#007bff' }}>Términos y Condiciones</a>.
      </p>
    </div>
  );
}