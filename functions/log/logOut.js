import { supabase } from '../supabaseClient.js';

/**
 * Elimina el key de la cuenta.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function logOut(){
  try{
    const { error } = await supabase.auth.signOut();
    if (error) return {
        success: false,
        message: "No se esta registrado o ocurrio un error",
        data: null,
      }

    return {
      success: true,
      message: `Secion cerada`,
      data: null,
    }
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err}`,
      data: null,
    }
  }
}