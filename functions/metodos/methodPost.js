import { supabase } from '../../supabaseClient.js';

/**
 * Sube uno o varios registro a supabase.
 * @param {Object} datos - Debe incluir `tabla` y los campos correspondientes
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function methodPost(datos){
  // Validar campos vacíos
  for (const [key, value] of Object.entries(datos)) {
    if (!value.trim()) {
      mensajeDiv.textContent = `El campo "${key}" es obligatorio`;
      return;
    }
  }

  try {
    const { data, error } = await supabase.from(tabla).insert(datos).select();

    if (error) {
      return {
        success: false,
        message: `Error al subir el registro: ${error.message}`,
        data: null,
      }
    }
    
    return {
      success: false,
      message: `Error al borrar registro: ${error.message}`,
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err.message}`,
      data: null,
    };
  }
}
