// components/FAQSection.jsx
import React from 'react';
import styles from '../styles/Docs.module.css'; // Importamos el CSS Module

// --- Datos de las Preguntas (Manteniendo la estructura original) ---
const faqData = [
    {
        id: 1,
        question: '💳 ¿Cómo puedo realizar el pago de mi compra?',
        answer: (
            <>
                <p>Trabajamos con la plataforma de pagos de **Mercado Pago** para garantizar una transacción segura y rápida. Al finalizar tu pedido, serás redirigido a su pasarela donde podrás elegir entre varias opciones:</p>
                <ul>
                    <li><strong>Tarjeta de Crédito y Débito:</strong> Puedes pagar en cuotas sin interés (sujeto a promociones bancarias) o en un solo pago.</li>
                    <li><strong>Dinero en cuenta de Mercado Pago:</strong> Si ya tienes saldo en tu cuenta, puedes usarlo directamente.</li>
                    <li><strong>Efectivo:</strong> Generando un cupón para pagar en puntos de pago cercanos (como Pago Fácil o Rapipago).</li>
                </ul>
                <p>La integración con su API nos permite procesar tu pago de forma instantánea y con todos los protocolos de seguridad necesarios.</p>
            </>
        )
    },
    {
        id: 2,
        question: '📦 ¿Cómo puedo reclamar o reportar un problema con mi pedido (producto dañado, incompleto, etc.)?',
        answer: (
            <>
                <p>Si tu pedido llegó con algún inconveniente (producto faltante, dañado o incorrecto), el proceso más rápido es enviando un **correo electrónico** a nuestra casilla de soporte: **[ejemplo@tuempresa.com]**.</p>
                <p>Para agilizar la solución, te pedimos que incluyas la siguiente información:</p>
                <ol>
                    <li><strong>Número de Pedido:</strong> (Fundamental para la identificación).</li>
                    <li><strong>Descripción Detallada:</strong> Explica claramente el problema.</li>
                    <li><strong>Evidencia Fotográfica:</strong> Adjunta fotos del estado del paquete y del producto dañado, si aplica.</li>
                </ol>
                <p>Nuestro equipo revisará tu caso en un plazo máximo de 24 horas hábiles y te ofrecerá una solución, ya sea un reenvío, un cupón de descuento o un reembolso.</p>
            </>
        )
    },
    {
        id: 3,
        question: '🚚 ¿Cuánto tardará en llegar mi pedido?',
        answer: (
            <>
                <p>El tiempo de entrega varía según tu ubicación y el tipo de producto. Generalmente, una vez despachado el paquete, el envío demora entre **3 a 7 días hábiles**.</p>
                <p>Podrás ver el tiempo estimado exacto de entrega al ingresar tu código postal en la página del producto o al finalizar la compra. Una vez que el pedido sea enviado, recibirás un correo con el **número de seguimiento** para monitorear su recorrido en tiempo real.</p>
            </>
        )
    },
];
// -----------------------------------------------------------------------------


const FAQSection = () => {
    return (
        <div className={styles.pageContainer}>

            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Preguntas Frecuentes (FAQ) 🙋‍♀️</h1>
                <p>Encuentra respuestas rápidas a tus dudas más comunes sobre pagos, pedidos y envíos.</p>
            </header>

            <div className={styles.faqSection}>
                
                {faqData.map(item => (
                    // Aplicamos clases CSS Module para el ítem y su contenido
                    <div className={styles.questionItem} key={item.id}>
                        <h3 className={styles.title} className={styles.questionItemH3}>
                            {item.question}
                        </h3>
                        <div className={styles.questionItemContent}>
                            {item.answer}
                        </div>
                    </div>
                ))}

            </div>

            <footer className={styles.footer}>
                <p>
                    ¿Aún tienes dudas? No hay problema. Contáctanos a través de nuestro formulario de 
                    <a href="/contacto"> Contacto</a>.
                </p>
            </footer>

        </div>
    );
};

export default FAQSection;
