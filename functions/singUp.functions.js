import { supabase } from '../supabaseClient.js';

const forms = document.getElementsByClassName('form-registro');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form).entries());

    // Validar campos vacíos
    if (!datos.email?.trim() || !datos.password?.trim()) {
      mensajeDiv.textContent = 'Correo y contraseña son obligatorios.';
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: datos.email,
        password: datos.password,
      });

      if (error) {
        mensajeDiv.textContent = 'Error al crear usuario: ' + error.message;
      } else {
        mensajeDiv.textContent = '¡Usuario creado! Revisa tu correo para confirmar.';
        console.log('Usuario registrado:', data);
        form.reset();
      }
    } catch (error) {
      mensajeDiv.textContent = 'Error inesperado: ' + error.message;
    }
  });
});
