import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Cliente con Service Role Key (⚠️ Solo para backend)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Cliente con token de usuario (autenticado)
function createAuthedClient(token) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });
}

async function eliminarCuentaDelUsuario(token) {
  // 1. Obtener información del usuario autenticado
  const authedClient = createAuthedClient(token);
  const { data: userData, error: userError } = await authedClient.auth.getUser();

  if (userError || !userData?.user) {
    console.error('No se pudo autenticar al usuario:', userError?.message);
    return;
  }

  const userId = userData.user.id;

  // 2. Eliminar el usuario usando la Service Role Key
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Error al eliminar usuario:', error.message);
  } else {
    console.log('✅ Usuario eliminado correctamente:', userId);
  }
}

// ⚠️ Usa el token del usuario autenticado (ej. desde sesión)
const token = 'PON_AQUÍ_EL_ACCESS_TOKEN_DEL_USUARIO';

eliminarCuentaDelUsuario(token);

