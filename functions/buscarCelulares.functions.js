import { supabase } from '../supabaseClient.js';


const form = document.querySelector("#form_buscar");

function debounce(fn, delay = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Función para buscar celulares por múltiples campos
async function buscarCelularesPorCampos(filtros) {
  const condiciones = Object.entries(filtros)
    .filter(([campo, valor]) => valor && valor.trim() !== '') 
    .map(([campo, valor]) => `${campo}.ilike.%${valor.trim()}%`)
    .join(',');

  let query = supabase.from('celulares').select('*');

  if (condiciones) {
    query = query.or(condiciones);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error en búsqueda:', error.message);
    return [];
  }

  return data;
}

// Función para mostrar los celulares
function mostrarResultados(lista) {

  if (lista.length === 0) {
    // Mensaje si no hay resultados
    console.log("No se encontraron celulares que coincidan con los criterios de búsqueda.");
    return;
  }

  lista.forEach(celular => {
    console.log(celular)
  });
}

// Ver cambios en el formulario y buscar celulares
async function manejarCambioFormulario() {
  const filtros = Object.fromEntries(new FormData(form).entries());
  const celulares = await buscarCelularesPorCampos(filtros);
  mostrarResultados(celulares);
};

form.addEventListener('input', debounce(manejarCambioFormulario, 500));

// Cargar todos los celulares al iniciar la página
window.addEventListener('DOMContentLoaded', async () => {
  const celulares = await buscarCelularesPorCampos({});
  mostrarResultados(celulares);
});