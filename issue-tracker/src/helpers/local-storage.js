const localStorageHelper = {
    /**
     * Guarda un valor en localStorage
     * @param {string} key - Clave del item
     * @param {any} value - Valor a guardar (se stringifica automáticamente)
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            window.localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
        }
    },

    /**
     * Obtiene un valor de localStorage
     * @param {string} key - Clave del item
     * @param {any} defaultValue - Valor por defecto si no existe o hay error
     * @returns {any} Valor parseado o defaultValue
     */
    get(key, defaultValue = null) {
        try {
            const serialized = window.localStorage.getItem(key);
            if (serialized === null) return defaultValue;
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Elimina un item de localStorage
     * @param {string} key - Clave del item
     */
    remove(key) {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
        }
    },

    /**
     * Limpia todo localStorage (usar con precaución)
     */
    clear() {
        try {
            window.localStorage.clear();
        } catch (error) {
            console.error('Error limpiando localStorage:', error);
        }
    },

    /**
     * Verifica si existe una clave en localStorage
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return window.localStorage.getItem(key) !== null;
    }
};

export default localStorageHelper;