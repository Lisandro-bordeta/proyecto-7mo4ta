import { supabase } from '../../supabaseClient.js';

/**
 * Devuelve un tocken de su cuenta al usuario.
 * @param {Object} email - Debe incluir un email
 * @param {Object} password - Debe incluir una contraseña
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function singIn(email, password) {
  if (!email?.trim() || !password?.trim()) {
    return {
      success: false,
      message: 'Campo vacio.',
      data: null,
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) return {
        success: false,
        message: `Ocurrio un error al iniciar secion: ${error}`,
        data: null,
      }

    return {
      success: true,
      message: 'Se inicio secion correctamente',
      data: data ?? null,
    }
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err}`,
      data: null,
    };
  }
}
