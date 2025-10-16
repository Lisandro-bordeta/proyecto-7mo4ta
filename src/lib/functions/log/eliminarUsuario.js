import { supabase } from '../supabaseClient.js';
/**
 * Elimina el usuario registrado.
 * @param {Object} datos - Debe incluir `tabla` y `id`
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function eliminarCuentaDelUsuario() {
  // 1. Obtener el token de la sesión actual
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error('No hay sesión activa o error:', sessionError?.message);
    return { 
      success: false, 
      message: 'No hay sesión activa',
      data: null,
    };
  }

  const token = session.access_token;

  const supabaseAuthed = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  const { data: userData, error: userError } = await supabaseAuthed.auth.getUser();

  if (userError || !userData?.user) {
    console.error('Error obteniendo usuario:', userError?.message);
    return { 
      success: false, 
      message: 'No se pudo obtener usuario autenticado',
      data: null,
    };
  }

  const userId = userData.user.id;

  // Eliminar usuario con la clave admin (service role)
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error('Error al eliminar usuario:', deleteError.message);
    return { 
      success: false, 
      message: deleteError.message,
      data: null,
    };
  }

  console.log('Usuario eliminado:', userId);
  return { 
    success: true, 
    message: 'Usuario eliminado correctamente',
    data: null,
  };
}

