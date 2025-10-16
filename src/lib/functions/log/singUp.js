import { supabase } from '../../supabaseClient.js';

/**
 * Crea una nueva cuenta en supabase.
 * @param {Object} email - Debe incluir un email
 * @param {Object} password - Debe incluir una contraseña
 * @param {Object} displayName - Debe incluir un nombre publico
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function singUp(email, password, displayName){
  // Validar campos vacíos
  if (!email?.trim() || !password?.trim() || !displayName?.trim()) return {
      success: false,
      message: `Campo vacio`,
      data: null,
    };

  try {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            displayName: displayName,
          }
        }
    });

    if (error) return {
      success: false,
      message: `Error al crear sesión: ${error.message}`,
      data: null,
    }

    return {
      success: true,
      message: `Se creo sesión correctamente`,
      data: data,
    }
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err}`,
      data: null,
    };
  }
  }