import { supabase } from '../supabaseClient.js';

const forms = document.getElementsByClassName('form-get');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');
  const lista = form.querySelector('.lista-datos');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tabla = e.target.dataset.tabla;

    if (!tabla) {
      mensajeDiv.textContent = 'Falta el atributo data-tabla en el formulario.';
      return;
    }

    try {
      const { data, error } = await supabase.from(tabla).select('*');

      if (error) {
        mensajeDiv.textContent = 'Error al obtener datos: ' + error.message;
        console.error(error);
        return;
      }

      if (!data.length) {
        mensajeDiv.textContent = 'No se encontraron registros en la tabla.';
        lista.innerHTML = '';
        return;
      }

      // Mostrar resultados
      lista.innerHTML = '';

      data.forEach(item => {
        console.log(item);
        // Agregarle estilo
      });

      mensajeDiv.textContent = `Se encontraron ${data.length} registros en "${tabla}".`;
      console.log('Datos obtenidos:', data);

    } catch (err) {
      mensajeDiv.textContent = 'Error inesperado: ' + err.message;
    }
  });
});
