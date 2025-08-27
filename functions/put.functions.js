import { supabase } from '../supabaseClient.js'

    const form = document.getElementById('form-actualizar');
    const mensajeDiv = document.getElementById('mensaje');

    form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form).entries());

    for (const [key, value] of Object.entries(datos)) {
        if (!value) {
            mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
            return;
        }
    }

    const { tabla, id, ...campos } = datos;

    const { data, error } = await supabase.from(tabla).update(campos).eq('id', id);
      if (error) {
        mensajeDiv.textContent = 'Error al actualizar registro: ' + error.message;
      } else {
        mensajeDiv.textContent = 'Registro actualizado correctamente!';
        console.log('Actualizado:', data);
      }
    });