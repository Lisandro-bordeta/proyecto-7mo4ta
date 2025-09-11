import { supabase } from '../supabaseClient.js'

/**
 * Verifica que el usuario este registrado
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */

export async function registrado() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        alert('Ocurrió un error al verificar la sesión del usuario');
        return {
            success: false,
            message: "Error al obtener la información del usuario.",
            data: null,
        }
    }

    if (!user) {
        alert('Debes iniciar sesión antes de realizar esta acción');
        return {
            success: false,
            message: "El usuario no está autenticado.",
            data: null,
        }
    }

    return {
        success: true,
        message: "Se confirmó que el usuario está registrado.",
        data: user ?? null,
    };
}

/**
 * Verifica que el usuario sea administrador
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null  }>}
 */
export async function administrador () {
    const respuesta = await registrado()
    if (!respuesta?.data?.id) {
        return respuesta;
    }

    const { data, error } = await supabase
        .from('user_type')
        .select('tipo')
        .eq('auth_user_id', respuesta.data.id)
        .single();

    if (error) {
        alert('Ocurrió un error al verificar tu rol de usuario');
        return {
            success: false,
            message: `Error al obtener el rol: ${error.message}`,
            data: null,
        };
    }
    if (!data) {
        alert('No se encontró información de rol para este usuario');
        return {
            success: false,
            message: "No se encontró información de rol para este usuario.",
            data: null,
        };
    }

    if (data.tipo !== 'admin') {
        alert('Debes ser administrador para realizar esta acción');
        return {
            success: false,
            message: "El usuario no es administrador.",
            data: data ?? null,
        }
    }

    return {
        success: true,
        message: "Se confirmo la verificacion de administrador.",
        data: data ?? null,
    };
}