import { supabase } from '../../supabaseClient.js';

/**
 * Crea una nueva cuenta en supabase.
 * @param {Object} data_user - Los datos del nuevo usuario.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function singUp(data_user){
  try{
    const { data, error } = await supabase.rpc('create_user', {
      email: data_user.email,
      password: data_user.password,
      display_name: data_user.display_name,
      image_url: data_user.image_url,
      rol: data_user.rol
    });
  
    if (error) {
      return {
        success: false,
        message: `Error al crear el usuario: ${error}`,
        data: null,
      };
    }
    return {
      success: true,
      message: 'Cuenta creada.',
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err}`,
      data: null,
    };
  }
}