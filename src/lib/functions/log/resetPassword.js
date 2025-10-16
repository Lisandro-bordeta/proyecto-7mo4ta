import { supabase } from '../../supabaseClient.js';

/**
 * Cambia la contraseña del usuario actual.
 * @param {Object} nuevaContraseña - Debe incluir una contraseña nueva
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
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
        success: true,
        message: "Contraseña actualizada correctamente.",
        data: data ?? null,
      }
}

console.log(await resetPassword("contraseña2"))