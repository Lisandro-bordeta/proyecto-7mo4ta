import { supabase } from '../supabaseClient.js'

 const form = document.getElementById('form-registro');
    const mensajeDiv = document.getElementById('mensaje');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const datos = Object.fromEntries(new FormData(form).entries());

      const { data, error } = await supabase.auth.signUp({
        email: datos.email,
        password: datos.password,
      });

      if (error) {
        mensajeDiv.textContent = 'Error al crear usuario: ' + error.message;
      } else {
        mensajeDiv.textContent = '¡Usuario creado! Revisa tu correo para confirmar.';
        console.log('Usuario registrado:', data);
      }
    });