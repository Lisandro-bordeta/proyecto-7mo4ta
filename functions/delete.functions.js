import { supabase } from '../supabaseClient.js'

const form = document.getElementById('form-eliminar');
const mensajeDiv = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = Object.fromEntries(new FormData(form).entries());

  if (!datos.table || !datos.id) {
    mensajeDiv.textContent = 'Debes proporcionar el nombre de la tabla y un ID válido.';
    return;
  }

  const { data, error } = await supabase.from(datos.table).delete().eq('id', datos.id);

  if (error) {
    mensajeDiv.textContent = 'Error al borrar registro: ' + error.message;
  } else {
    mensajeDiv.textContent = 'Registro borrado correctamente.';
    console.log('Eliminado:', data);
  }
});