// pages/terminos-y-condiciones.js
import Head from 'next/head';
import TerminosYCondiciones from '../components/TerminosYCondiciones';

export default function TerminosPage() {
  return (
    <>
      {/* Head de Next.js para el SEO y metadatos */}
      <Head>
        <title>Términos y Condiciones - [Nombre de tu E-commerce]</title>
        <meta name="description" content="Términos y condiciones legales de nuestro sitio web." />
      </Head>
      <TerminosYCondiciones />
    </>
  );
}
