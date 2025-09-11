import { supabase } from '../supabaseClient.js';

export async function signUp(email, password){
  // Validar campos vacíos
  if (!email?.trim() || !password?.trim()) return {
      success: false,
      message: `Campo vacio`,
      data: null,
    };

  try {
    const { data, error } = await supabase.auth.signUp({
      email: datos.email,
      password: datos.password,
    });

    if (error) return {
      success: false,
      message: `Error al iniciar secion: ${error.message}`,
      data: null,
    }

    return {
      success: true,
      message: `Se inicio secion correctamente`,
      data: null,
    }
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err}`,
      data: null,
    };
  }
  }