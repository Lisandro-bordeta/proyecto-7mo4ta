import { supabase } from '../supabaseClient.js';

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error al cerrar sesión:', error.message);
  } else {
    console.log('Sesión cerrada correctamente');
  }
};

document.querySelectorAll('.btn-logout').forEach(e => {
  e.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
});
