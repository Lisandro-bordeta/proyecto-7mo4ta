//src/components/TerminosYCondiciones.jsx
import React from 'react';
// Si usas un archivo CSS separado, lo importarías aquí:
// import './TerminosYCondiciones.css'; 

const TerminosYCondiciones = () => {
    // Definimos estilos en línea para replicar el CSS del original.
    // NOTA: Se recomienda usar un archivo CSS para estilos complejos.
    const styles = {
        body: { // Estos estilos se aplicarían mejor al contenedor principal o a un CSS global
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.6,
            margin: '20px',
        },
        h1h2h3: {
            color: '#333',
        },
        section: {
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid #eee',
        }
    };

    return (
        // Utilizamos un <div> como contenedor principal para simular el <body> del original.
        // Aplicamos los estilos de 'body' al contenedor principal.
        <div style={styles.body}> 
            
            <header>
                {/* Aplicamos los estilos de color a los títulos, aunque es mejor con CSS normal */}
                <h1 style={styles.h1h2h3}>Términos y Condiciones</h1> 
                <p>Última actualización: 16 de Octubre de 2025</p>
            </header>

            {/* Sección 1: Información General */}
            <section id="informacion-general" style={styles.section}>
                <h2 style={styles.h1h2h3}>1. Información General y Aceptación</h2>
                <p>Este documento establece los términos y condiciones que rigen el uso del sitio web de comercio electrónico **[Nombre de tu E-commerce]** (en adelante, "el Sitio") y la compra de sus productos.</p>
                <p>Al utilizar el Sitio y realizar un pedido, usted acepta plenamente estos Términos y Condiciones. Si no está de acuerdo con alguno de ellos, no debe utilizar este Sitio.</p>
                
                <h3 style={styles.h1h2h3}>Datos del Propietario:</h3>
                <ul>
                    <li><strong>Razón Social:</strong> [Tu Razón Social o Nombre Legal]</li>
                    <li><strong>Domicilio:</strong> [Tu Dirección Comercial Completa]</li>
                    {/* En JSX, el atributo 'href' se mantiene igual */}
                    <li><strong>Email:</strong> <a href="mailto:contacto@[tu-email.com]">contacto@[tu-email.com]</a></li>
                    <li><strong>Identificación Fiscal (CUIT/NIF/etc.):</strong> [Tu Número de Identificación]</li>
                </ul>
            </section>

            {/* Sección 2: Proceso de Compra */}
            <section id="proceso-compra" style={styles.section}>
                <h2 style={styles.h1h2h3}>2. Proceso de Compra y Precios</h2>
                <p><strong>Aceptación del Pedido:</strong> Todos los pedidos están sujetos a la disponibilidad del producto y a la aceptación por nuestra parte. Una vez realizado el pedido, recibirá una confirmación por correo electrónico.</p>
                <p><strong>Precios:</strong> Los precios de los productos son los indicados en el Sitio, están expresados en [Moneda Local] e incluyen [IVA/Impuestos, si aplica]. Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso, salvo en los pedidos ya confirmados.</p>
                <p><strong>Errores:</strong> En caso de un error evidente en el precio de un producto, nos reservamos el derecho de cancelar el pedido y realizar el reembolso correspondiente.</p>
            </section>

            {/* Sección 3: Pagos */}
            <section id="pagos" style={styles.section}>
                <h2 style={styles.h1h2h3}>3. Pagos y Seguridad</h2>
                <p>Aceptamos los siguientes métodos de pago: [Ejemplo: Tarjetas de crédito/débito (Visa, Mastercard), Transferencia bancaria, Plataformas de pago (Mercado Pago, PayPal, etc.)].</p>
                <p>El cargo en su tarjeta o cuenta se realizará al momento de la confirmación del pedido. Garantizamos que todas las transacciones se realizan bajo un sistema de seguridad SSL/TLS.</p>
            </section>

            {/* Sección 4: Envío y Entrega */}
            <section id="envio-entrega" style={styles.section}>
                <h2 style={styles.h1h2h3}>4. Envío y Entrega</h2>
                <p><strong>Plazos de Entrega:</strong> El plazo de entrega habitual es de [X a Y] días hábiles, salvo que se especifique lo contrario en la descripción del producto o durante el proceso de compra.</p>
                <p><strong>Costo de Envío:</strong> Los costos de envío se calcularán automáticamente al momento de la compra en función de la dirección de destino y el peso/volumen del paquete.</p>
                <p><strong>Riesgo:</strong> El riesgo de pérdida o daño de los productos se transmite al cliente en el momento de la entrega.</p>
            </section>

            {/* Sección 5: Devoluciones */}
            <section id="devoluciones" style={styles.section}>
                <h2 style={styles.h1h2h3}>5. Cambios, Devoluciones y Derecho de Desistimiento</h2>
                <p><strong>Derecho de Desistimiento:</strong> El cliente tiene derecho a desistir de la compra en un plazo de [Número, generalmente 10] días naturales a partir de la recepción del producto, sin necesidad de justificación.</p>
                <p><strong>Condiciones:</strong> Para ser elegible para una devolución, el artículo debe estar sin usar, en las mismas condiciones en que lo recibió y en su embalaje original.</p>
                <p><strong>Proceso:</strong> El cliente deberá notificar su decisión al correo electrónico [email de contacto] y seguir las instrucciones proporcionadas para el envío de la devolución. Los costos de envío de la devolución correrán a cargo del cliente.</p>
            </section>
            
            {/* Sección 6: Propiedad Intelectual */}
            <section id="propiedad-intelectual" style={styles.section}>
                <h2 style={styles.h1h2h3}>6. Propiedad Intelectual</h2>
                <p>Todo el contenido del Sitio, incluyendo textos, gráficos, logotipos, íconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, son propiedad de [Nombre de tu E-commerce] o de sus proveedores de contenido y están protegidos por las leyes de propiedad intelectual.</p>
            </section>

            {/* Sección 7: Legislación Aplicable */}
            <section id="legislacion-aplicable" style={styles.section}>
                <h2 style={styles.h1h2h3}>7. Ley Aplicable y Jurisdicción</h2>
                <p>Estos Términos y Condiciones se rigen e interpretan de acuerdo con las leyes de [Tu País/Jurisdicción]. Cualquier disputa que surja en relación con el Sitio o las compras realizadas a través de él será sometida a la jurisdicción de los tribunales de [Tu Ciudad/Provincia].</p>
            </section>

            <footer>
                {/* Uso de fragmento <React.Fragment> o un <div> implícito para envolver elementos */}
                <p><a href="#informacion-general">Volver arriba</a></p>
                <p>&copy; 2025 [Nombre de tu E-commerce]. Todos los derechos reservados.</p>
                <p>
                    {/* En React, si usas React Router, estos links serían componentes <Link> en lugar de <a> */}
                    <a href="/politica-privacidad">Política de Privacidad</a> | 
                    <a href="/politica-cookies">Política de Cookies</a>
                </p>
            </footer>

        </div>
    );
};

export default TerminosYCondiciones;