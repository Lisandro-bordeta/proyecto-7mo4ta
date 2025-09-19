import { supabase } from '../../supabaseClient.js';

/**
 * Obtiene registros de cualquier tabla usando filtros con coincidencia parcial (ilike).
 * @param {string} params.tabla - Nombre de la tabla en Supabase.
 * @param {Object} params.filtros - Objeto con pares campo: valor para filtrar.
 * @param {String} params.campos - Campos a seleccionar.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null }>}
 */
export async function methodGetList( tabla, filtros = {}, campos = "*") {

  if (!tabla) {
    return {
      success: false,
      message: 'Debes proporcionar el nombre de la tabla.',
      data: null,
    };
  }

  try {
    // Construir condiciones ilike para los filtros
    const condiciones = Object.entries(filtros)
      .filter(([_, valor]) => valor && valor.toString().trim() !== '')
      .map(([campo, valor]) => `${campo}.ilike.%${valor.toString().trim()}%`)
      .join(',');

    let query = supabase.from(tabla).select(campos);

    if (condiciones) {
      query = query.or(condiciones);
    }

    const { data, error } = await query;

    if (error) {
      return {
        success: false,
        message: `Error al buscar en tabla "${tabla}": ${error.message}`,
        data: null,
      };
    }

    if (!data.length) {
      return {
        success: true,
        message: `No se encontraron registros en la tabla "${tabla}" con los filtros proporcionados.`,
        data: {},
      };
    }

    return {
      success: true,
      message: `Se encontraron ${data.length} registros en la tabla "${tabla}".`,
      data,
    };

  } catch (error) {
    return {
      success: false,
      message: `Error inesperado: ${error.message}`,
      data: null,
    };
  }
}

console.log(await methodGetList("celulares"))