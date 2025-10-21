// components/ShippingForm.js
import styles from '../styles/Checkout.module.css';

export default function ShippingForm({ formData, handleChange }) {
  return (
    <section id="shipping-info">
      <h2 className={styles.sectionTitle}>1. Dirección de Envío</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre Completo</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="direccion">Dirección</label>
          <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle, Número, Depto." required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ciudad">Ciudad</label>
          <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cp">Código Postal</label>
          <input type="text" id="cp" name="cp" value={formData.cp} onChange={handleChange} required />
        </div>
      </form>
    </section>
  );
}