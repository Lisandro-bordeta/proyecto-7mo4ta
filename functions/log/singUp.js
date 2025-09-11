import { supabase } from '../../supabaseClient.js';

export async function signUp(email, password){
  // Validar campos vacíos
  if (!email?.trim() || !password?.trim()) return {
      success: false,
      message: `Campo vacio`,
      data: null,
    };

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
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

signUp("moovicelusarg@gmail.com", "contraseña123")
  .then(respuesta => console.log(respuesta))
  .catch(err => console.error("Error al crear cuenta:", err));