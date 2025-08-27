import { supabase } from '../supabaseClient.js'

async function obtenerCelulares(tabla) {
  const { data, error } = await supabase
    .from('celulares')
    .select('*');

  if (error) {
    console.error('Error al obtener celulares:', error.message);
    alert('Error al obtener celulares');
    return;
  }
  


  data.forEach(celular => {
    // Crear un elemento de lista para cada celular
    console.log(celular)
  });
}

window.onload = obtenerCelulares;