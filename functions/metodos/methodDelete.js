import { supabase } from '../../supabaseClient.js';
import { administrador } from '../seguridad.js';

/**
 * Elimina un registro de una tabla en Supabase.
 * @param {Object} datos - Debe incluir `tabla` y `id`
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */

export async function methodDelete(datos) {
  // Verificar autorización
  const autorizado = await administrador();
  if (!autorizado) {
    return {
      success: false,
      message: "No autorizado.",
      data: null,
    };
  }

  // Validar entrada
  const tabla = datos.tabla?.trim();
  const id = datos.id?.trim();

  if (!tabla || !id) {
    return {
      success: false,
      message: "Debes proporcionar el nombre de la tabla y un ID válido.",
      data: null,
    };
  }

  // Intentar eliminar el registro
  try {
    const { data, error } = await supabase
      .from(tabla)
      .delete()
      .eq('id', id)
      .select(); // Devuelve el registro eliminado

    if (error) {
      return {
        success: false,
        message: `Error al borrar registro: ${error.message}`,
        data: null,
      };
    }

    return {
      success: true,
      message: "Registro borrado correctamente.",
      data: data ?? null,
    };

  } catch (err) {
    return {
      success: false,
      message: `Error inesperado: ${err.message}`,
      data: null,
    };
  }
}
