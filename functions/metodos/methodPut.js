import { supabase } from '../../supabaseClient.js';

/**
 * Modificar registros de la tabla mediante un ID.
 * @param {string} params.tabla - Nombre de la tabla en Supabase.
 * @param {String} params.datos - Datos del registro a cambiar.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null }>}
 */
export async function methodPut(tabla, datos){
  const { id, ...campos } = datos;
  if (!id) {
    return {
      success: false,
      message: "Es necesario la entrada de un ID",
      data: null,
    };
  }

  try {
    const { data, error } = await supabase
      .from(tabla)
      .update(campos)
      .eq('id', id)
      .select();

    if (error) {
      return {
        success: false,
        message: `Error al actualizar el campo: ${error.message}`,
        data: null,
      }
    }

    return {
      success: true,
      message: `Error al actualizar el campo: ${error.message}`,
      data: data ?? null,
    }
  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err.message}`,
      data: null,
    }
  }
  };
