import React from 'react';
// Es una buena práctica importar un archivo CSS para manejar los estilos complejos
// import './FAQSection.css'; 

// --- Datos de las Preguntas (Manejado en React como un array de objetos) ---
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
    // Definimos los estilos inline convertidos del CSS original.
    // NOTA: En un proyecto real, se usaría un archivo CSS para esto.
    const styles = {
        body: { // Aplicado al contenedor principal
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.6,
            margin: '20px',
            color: '#333',
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
        },
        faqSection: {
            maxWidth: '800px',
            margin: '0 auto',
        },
        questionItem: {
            marginBottom: '25px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
        },
        questionItemH3: {
            color: '#0056b3', // Un color que destaque la pregunta
            marginTop: 0,
            cursor: 'pointer',
        },
        questionItemP: {
            marginTop: '10px',
            paddingLeft: '20px',
        }
    };


    return (
        <div style={styles.body}>

            <header style={styles.header}>
                <h1>Preguntas Frecuentes (FAQ) 🙋‍♀️</h1>
                <p>Encuentra respuestas rápidas a tus dudas más comunes sobre pagos, pedidos y envíos.</p>
            </header>

            <div className="faq-section" style={styles.faqSection}>
                
                {/* Usamos el método .map() para iterar sobre el array faqData 
                  y crear un componente <div className="question-item"> por cada elemento.
                */}
                {faqData.map(item => (
                    // React requiere una 'key' única para cada elemento en un .map()
                    <div className="question-item" style={styles.questionItem} key={item.id}>
                        <h3 style={styles.questionItemH3}>
                            {item.question}
                        </h3>
                        {/* Aquí se renderiza el contenido de la respuesta (answer).
                          En el HTML original, esto sería el contenido dentro de la pregunta.
                        */}
                        <div style={styles.questionItemP}>
                            {item.answer}
                        </div>
                    </div>
                ))}

            </div>

            <footer>
                <p style={{ textAlign: 'center', marginTop: '50px' }}>
                    ¿Aún tienes dudas? No hay problema. Contáctanos a través de nuestro formulario de 
                    <a href="/contacto"> Contacto</a>.
                </p>
            </footer>

        </div>
    );
};

export default FAQSection;

// Nota Adicional: Para hacer esto un acordeón (interactivo), necesitarías usar el Hook useState.