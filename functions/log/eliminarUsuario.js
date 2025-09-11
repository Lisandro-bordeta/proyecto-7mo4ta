import { supabase } from '../supabaseClient.js';

// Cliente administrador con Service Role Key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function eliminarCuentaDelUsuario() {
  // 1. Obtener el token de la sesión actual
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error('No hay sesión activa o error:', sessionError?.message);
    return { success: false, message: 'No hay sesión activa' };
  }

  const token = session.access_token;

  // 2. Crear cliente autenticado con el token
  const supabaseAuthed = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  // 3. Obtener info del usuario autenticado
  const { data: userData, error: userError } = await supabaseAuthed.auth.getUser();

  if (userError || !userData?.user) {
    console.error('Error obteniendo usuario:', userError?.message);
    return { success: false, message: 'No se pudo obtener usuario autenticado' };
  }

  const userId = userData.user.id;

  // 4. Eliminar usuario con la clave admin (service role)
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error('Error al eliminar usuario:', deleteError.message);
    return { success: false, message: deleteError.message };
  }

  console.log('Usuario eliminado:', userId);
  return { success: true, message: 'Usuario eliminado correctamente' };
}

// Ejemplo de uso:
eliminarCuentaDelUsuario()
  .then(console.log)
  .catch(console.error);

