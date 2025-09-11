import { supabase } from '../supabaseClient.js';

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