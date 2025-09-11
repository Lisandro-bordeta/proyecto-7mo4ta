import { supabase } from '../supabaseClient.js';

export async function resetPassword(nuevaContraseña) {
    const { data, error } = await supabase.auth.updateUser({
        password: nuevaContraseña,
    });
  
    if (error) return {
        success: false,
        message: `Error al cambiar la contraseña: ${error}`,
        data: null,
        }
    return {
        success: false,
        message: "Contraseña actualizada correctamente.",
        data: data ?? null,
      }
}