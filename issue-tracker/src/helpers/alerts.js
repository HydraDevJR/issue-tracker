import Swal from 'sweetalert2';

// Colores centralizados (fáciles de modificar globalmente)
const COLORS = {
  confirm: '#0A2647',   // Azul oscuro (botón principal)
  cancel: '#d33',       // Rojo (botón destructivo)
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};

// Opciones base para estandarizar el diseño
const BASE_OPTIONS = {
  backdrop: true,
  confirmButtonColor: COLORS.confirm,
  cancelButtonColor: COLORS.cancel,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancelar',
  allowOutsideClick: false,
  allowEscapeKey: true
};

/**
 * Muestra una alerta de error genérica
 * @param {string} message - Mensaje a mostrar
 * @param {string} title - Título (opcional, por defecto "Error")
 * @returns {Promise<SweetAlertResult>}
 */
export const showErrorAlert = (message, title = 'Error') => {
  return Swal.fire({
    ...BASE_OPTIONS,
    title,
    text: message,
    icon: 'error',
    confirmButtonText: 'Entendido'
  });
};

/**
 * Muestra una alerta de éxito (sin redirección automática)
 * @param {string} message - Mensaje a mostrar
 * @param {string} title - Título (opcional, por defecto "Éxito")
 * @returns {Promise<SweetAlertResult>}
 */
export const showSuccessAlert = (message, title = 'Éxito') => {
  return Swal.fire({
    ...BASE_OPTIONS,
    title,
    text: message,
    icon: 'success',
    confirmButtonText: 'OK',
    timer: 2000,
    timerProgressBar: true
  });
};

/**
 * Alerta de confirmación para acciones peligrosas (eliminar, etc.)
 * @param {string} message - Mensaje de confirmación
 * @param {string} title - Título (opcional, por defecto "¿Estás seguro?")
 * @returns {Promise<boolean>} - true si el usuario confirma, false si cancela
 */
export const showConfirmAlert = async (message, title = '¿Estás seguro?') => {
  const result = await Swal.fire({
    ...BASE_OPTIONS,
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: COLORS.cancel,
    cancelButtonColor: COLORS.confirm
  });
  return result.isConfirmed;
};

/**
 * Alerta de error HTTP que extrae el mensaje del backend automáticamente
 * Soporta errores de Axios, errores nativos y strings planos.
 * @param {unknown} error - Error capturado en el catch
 * @param {string} defaultMessage - Mensaje por defecto si no se puede extraer
 * @returns {Promise<SweetAlertResult>}
 */
export const showHttpErrorAlert = (error, defaultMessage = 'Ocurrió un error inesperado') => {
  let message = defaultMessage;

  if (!error) {
    message = 'Error desconocido';
  } else if (typeof error === 'string') {
    message = error;
  } else if (error.message && !error.response) {
    // Error de JavaScript (red, sintaxis, etc.)
    message = error.message;
  } else if (error.response) {
    // El servidor respondió con un código de error (4xx, 5xx)
    const { status, data } = error.response;
    if (data && typeof data === 'object') {
      message = data.message || data.error || `Error ${status}`;
    } else if (data && typeof data === 'string') {
      message = data;
    } else {
      message = `Error del servidor (${status})`;
    }
  } else if (error.request) {
    // La petición se hizo pero no hubo respuesta
    message = 'No se pudo conectar con el servidor. Revisa tu conexión.';
  }

  return Swal.fire({
    ...BASE_OPTIONS,
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'Entendido'
  });
};

/**
 * Alerta de información (aviso, consejos, etc.)
 * @param {string} message - Mensaje a mostrar
 * @param {string} title - Título (opcional, por defecto "Información")
 * @returns {Promise<SweetAlertResult>}
 */
export const showInfoAlert = (message, title = 'Información') => {
  return Swal.fire({
    ...BASE_OPTIONS,
    title,
    text: message,
    icon: 'info',
    confirmButtonText: 'Entendido'
  });
};

/**
 * Alerta de carga (útil para operaciones asíncronas largas)
 * @param {string} message - Mensaje a mostrar durante la carga
 * @returns {SweetAlert} - Instancia para poder cerrarla programáticamente
 */
export const showLoadingAlert = (message = 'Cargando, por favor espera...') => {
  return Swal.fire({
    title: 'Cargando',
    text: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

/**
 * Alerta genérica (máxima flexibilidad)
 * @param {Object} options - Opciones de SweetAlert2 (sobrescribe las base)
 * @returns {Promise<SweetAlertResult>}
 */
export const showCustomAlert = (options) => {
  return Swal.fire({
    ...BASE_OPTIONS,
    ...options
  });
};