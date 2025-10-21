// pages/preguntas-frecuentes.js
import Head from 'next/head';
import FAQSection from '../components/FAQSection';

export default function FAQPage() {
  return (
    <>
      {/* Head de Next.js para el SEO y metadatos */}
      <Head>
        <title>Preguntas Frecuentes (FAQ) - [Nombre de tu E-commerce]</title>
        <meta name="description" content="Respuestas a las dudas más comunes sobre tu compra." />
      </Head>
      <FAQSection />
    </>
  );
}
