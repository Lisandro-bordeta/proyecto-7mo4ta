// exportar.js
import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'fs/promises';

// Reemplaza con tus claves de Supabase
const SUPABASE_URL = "https://pwxpxouatzzxvvvszdnx.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3eHB4b3VhdHp6eHZ2dnN6ZG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3OTU3MTAsImV4cCI6MjA3MTM3MTcxMH0.6o7Za904AOi-QwresK-Y1Z-ev83WyV_hjFDcvbOwjTo"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function exportarDatos() {
  const { data, error } = await supabase
    .from('celulares') // Reemplaza con el nombre de tu tabla
    .select('*');

  if (error) {
    console.error('❌ Error al obtener los datos:', error);
    return;
  }
  await writeFile('datos_exportados.json', JSON.stringify(data, null, 2));
  console.log('✅ Datos exportados correctamente a datos_exportados.json');
}

exportarDatos();



