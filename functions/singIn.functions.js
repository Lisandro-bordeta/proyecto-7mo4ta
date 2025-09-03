import { supabase } from '../supabaseClient.js';

const forms = document.getElementsByClassName('form-login');

Array.from(forms).forEach(form => {
  const mensajeDiv = form.querySelector('.mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form).entries());

    // Validar campos vacíos
    if (!datos.email?.trim() || !datos.password?.trim()) {
      mensajeDiv.textContent = 'El correo y la contraseña son obligatorios.';
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: datos.email,
        password: datos.password
      });

      if (error) {
        mensajeDiv.textContent = 'Error al iniciar sesión: ' + error.message;
      } else {
        mensajeDiv.textContent = 'Sesión iniciada correctamente!';
        console.log('Usuario:', data.user);
        form.reset();
      }
    } catch (error) {
      mensajeDiv.textContent = 'Error inesperado: ' + error.message;
    }
  });
});
