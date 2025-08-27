import { supabase } from '../supabaseClient.js'

const form = document.getElementById('form-login');
const mensajeDiv = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form).entries());

    const { data, error } = await supabase.auth.signInWithPassword({
    email: datos.email,
    password: datos.password
    });

    if (error) {
    mensajeDiv.textContent = 'Error al iniciar sesión: ' + error.message;
    } else {
    mensajeDiv.textContent = 'Sesión iniciada correctamente!';
    console.log('Usuario:', data.user);
    // Aquí puedes redirigir o guardar token si lo necesitas
    }
});