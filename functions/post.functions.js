import { supabase } from '../supabaseClient.js'

const form = document.getElementById('form-insertar');
const mensajeDiv = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = Object.fromEntries(new FormData(form).entries());

  // Validar que ningún campo esté vacío o solo espacios
  for (const [key, value] of Object.entries(datos)) {
    if (!value) {
      mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
      return;
    }
  }

  const { tabla, ...campos } = datos;

  try {
    const { data, error } = await supabase.from(datos.tabla).insert([campos]);

    if (error) {
      mensajeDiv.textContent = 'Error al insertar registro: ' + error.message;
    } else {
      mensajeDiv.textContent = 'Registro insertado correctamente!';
      console.log('Insertado:', data);
      form.reset();
    }
  } catch (error) {
    mensajeDiv.textContent = 'Error inesperado: ' + error.message;
  }
});
