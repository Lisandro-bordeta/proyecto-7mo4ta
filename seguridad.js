import { supabase } from '../supabaseClient.js'

export async function verificacion(){
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        alert('Debes iniciar sesión para confirmar la compra');
        return;
    }
}
/*
export async function verificacion(){
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    //  where typo_usuario = administrador
    if ((authError || !user)) {
        alert('Debes ser administrador para realizar esta accion');
        return;
    }
}

export const tablas_visibles = [
    tabla = {
        campo,
        otrocamo,
        etc
    }
];
*/
