import { supabase } from '../supabaseClient.js'

export async function verificacion(){
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        alert('Debes iniciar sesión para confirmar la compra');
        return false;
    } else return true;
}

export async function administrador() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        alert('Debes iniciar sesión para realizar esta acción');
        return false;
    }

    const { data, error } = await supabase
        .from('user_type')
        .select('tipo')
        .eq('auth_user_id', user.id)
        .single();

        console.log(user.id)

    if (error || !data) {
        alert('No se pudo verificar tu rol de usuario');
        return false;
    }
    console.log(data.tipo)
    if (data.tipo !== 'admin') {
        alert('Debes ser administrador para realizar esta acción');
        return false;
    }
    return true;
}

/*
export const tablas_visibles = [
    tabla = {
        campo,
        otrocamo,
        etc
    }
];

*/