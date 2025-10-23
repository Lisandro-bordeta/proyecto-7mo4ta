import { supabase } from '../../supabaseServer.js';

/**
 * Obtiene registros de cualquier tabla usando filtros con coincidencia parcial (ilike).
 * @param {string} params.tabla - Nombre de la tabla en Supabase.
 * @param {Object} params.filtros - Objeto con pares campo: valor para filtrar.
 * @param {String} params.campos - Campos a seleccionar.
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null }>}
 */
export async function methodGetListAuth( tabla) {
  if (!tabla) {
    return {
      success: false,
      message: 'Debes proporcionar el nombre de la tabla.',
      data: null,
    };
  }

  try {
    if (tabla === "authUsers") {
      // Agrega imagen y rol
      const { data: dataAuthUser, error: errorAuthUser } = await supabase.auth.admin.listUsers();
        if (errorAuthUser) {
            return {
                success: false,
                message: `Error al buscar en tabla "${tabla}": ${errorAuthUser.message}`,
                data: null,
            };
        }

        const { data: dataUser, error: errorUser } = await supabase.from("user").select("*");
        if (errorUser) {
            return {
                success: false,
                message: `Error al buscar en tabla "${tabla}": ${errorUser.message}`,
                data: null,
            };
        }
        // Combina la información de authUsers con la tabla user
        dataAuthUser.users.forEach(authUser => {
            const userInfo = dataUser.find(user => user.id === authUser.id);
            if (userInfo) {
                authUser.avatarUrl = userInfo.avatarUrl;
                authUser.role = userInfo.role;
            }
        });

        return {
            success: true,
            message: `Se encontraron ${dataAuthUser.users.length} registros en la tabla "${tabla}".`,
            data: dataAuthUser.users,
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

console.log(await methodGetListAuth("authUsers"));