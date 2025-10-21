// components/PaymentMethod.js
import styles from '../styles/Checkout.module.css';

export default function PaymentMethod({ paymentMethod, handlePaymentChange }) {
  return (
    <section id="payment-method" style={{ marginTop: '40px' }}>
      <h2 className={styles.sectionTitle}>2. Método de Pago</h2>
      
      {/* Opción Tarjeta */}
      <div className={styles.formGroup}>
        <label>
          <input
            type="radio"
            name="payment-option"
            value="credit-card"
            checked={paymentMethod === 'credit-card'}
            onChange={handlePaymentChange}
          />{' '}
          Tarjeta de Crédito/Débito
        </label>
        
        {paymentMethod === 'credit-card' && (
          <div id="card-details" style={{ padding: '10px', border: '1px solid #eee', marginTop: '10px' }}>
            <div className={styles.formGroup}>
              <label htmlFor="card-number">Número de Tarjeta</label>
              <input type="text" id="card-number" placeholder="XXXX-XXXX-XXXX-XXXX" />
            </div>
            <div className={styles.formGroup} style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="expiry">Fecha de Vencimiento</label>
                <input type="text" id="expiry" placeholder="MM/AA" />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" placeholder="XXX" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Opción Transferencia */}
      <div className={styles.formGroup}>
        <label>
          <input
            type="radio"
            name="payment-option"
            value="transfer"
            checked={paymentMethod === 'transfer'}
            onChange={handlePaymentChange}
          />{' '}
          Transferencia Bancaria
        </label>
      </div>
    </section>
  );
}