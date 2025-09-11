import { supabase } from '../supabaseClient.js';

export async function singIn(email, password) {
  // Validar campos vacíos
  if (!email?.trim() || password?.trim()) {
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
      success: false,
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
