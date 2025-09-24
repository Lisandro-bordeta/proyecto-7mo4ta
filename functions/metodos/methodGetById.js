import { supabase } from '../../supabaseClient.js';

/**
 * Obtiene un solo registro de una tabla específica mediante su ID.
 * @param {Object} datos - Debe incluir `tabla` (string) e `id` (string o number).
 * @returns {Promise<{ success: boolean, message: string, data: any | null }>}
 */

export async function methodGetById(tabla, id) {

  if (!tabla || !id) {
    return {
      success: false,
      message: 'Debes proporcionar el nombre de la tabla y un ID válido.',
      data: null,
    };
  }

  try {
    const { data, error } = await supabase
      .from(tabla)
      .select('*')
      .eq('id', id)
      .single(); // <- importante: solo devuelve un registro

    if (error) {
      return {
        success: false,
        message: `Error al obtener el registro: ${error.message}`,
        data: null,
      };
    }

    // Si la tabla es "celulares", obtener el nombre de la marca
    if (tabla === "celulares") {
      const { data: dataMarca, error: errorMarca } = await supabase.from("marcas").select("*");

      if (errorMarca) {
        return {
          success: false,
          message: `Error al buscar marcas para "${tabla}": ${errorMarca.message}`,
          data: null,
        };
      }

    // Agrega el nombre de la marca a cada celular
      const marca = dataMarca.find(mar => mar.id === data.id_marca);
      if (marca) {
        data.nombre_marca = marca.nombre;
      } else {
        data.nombre_marca = "Null";
      }
    }

    return {
      success: true,
      message: `Registro encontrado correctamente en la tabla "${tabla}".`,
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

console.log(await methodGetById("celulares", "0575d36c-a8db-4992-8e3a-cb4d7a853994"))