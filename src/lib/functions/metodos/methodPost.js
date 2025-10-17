import { supabase } from '../../supabaseClient.js';

/**
 * Sube uno o varios registro a supabase.
 * Si se inserta un celular, inserta o recupera primero la marca y la vincula.
 * @param {Object} datos - Datos del formulario
 * @param {string} tabla - Nombre de la tabla destino
 * @returns {Promise<{ success: boolean, message: string, data: any[] | null }>}
 */
export async function methodPost(datos, tabla) {
  // Validar campos vacíos
  for (const [key, value] of Object.entries(datos)) {
    if (!value || value === '') {
      return {
        success: false,
        message: `El campo "${key}" es obligatorio`,
        data: null
      };
    }
  }

  try {
    if (tabla === 'celulares' && datos.brand) {
      const { data: marcaExistente, error: marcaError } = await supabase
        .from('marcas')
        .select('id')
        .eq('nombre', datos.brand)
        .single(); // Solo una

      let marcaId;

      if (marcaError && marcaError.code !== 'PGRST116') {
        // PGRST116 = registro no encontrado (no es un error crítico)
        throw marcaError;
      }

      if (marcaExistente) {
        marcaId = marcaExistente.id;
      } else {
        // Insertar nueva marca
        const { data: nuevaMarca, error: errorMarcaInsert } = await supabase
          .from('marcas')
          .insert({ nombre: datos.brand })
          .select()
          .single();

        if (errorMarcaInsert) {
          throw errorMarcaInsert;
        }

        marcaId = nuevaMarca.id;
      }
      datos.id_brand = marcaId;
      delete datos.brand; // Eliminar campo innecesario

      const file = datos.file
      if (file){
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `productos/${fileName}`;

        const { data, error } = await supabase.storage
          .from("imagenes")
          .upload(filePath, file);
        if (error) {
          return {
            success: false,
            message: `Error al subir imagen al storage: ${error.message}`,
            data: null,
          };
        }

        const { data: publicUrlData } = supabase.storage
          .from("cellimagen")
          .getPublicUrl(filePath);
        datos.imageUrl = publicUrlData.publicUrl;
      }
    }
    // Insertar en la tabla original
    const { data, error } = await supabase
      .from(tabla)
      .insert(datos)
      .select();

    if (error) {
      return {
        success: false,
        message: `Error al insertar en ${tabla}: ${error.message}`,
        data: null,
      };
    }

    return {
      success: true,
      message: `Registro insertado correctamente en ${tabla}`,
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
