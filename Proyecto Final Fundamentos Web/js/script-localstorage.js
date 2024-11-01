
// Función para guardar datos en localStorage con manejo de errores
function guardarEnLocalStorage(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        console.log(`Datos guardados en localStorage con clave: ${key}`);
        return true;
    } catch (error) {
        console.error(`Error al guardar datos en localStorage con clave: ${key}`, error);
        return false;
    }
}

// Función para recuperar datos desde localStorage con manejo de errores
function recuperarDesdeLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        if (data) {
            console.log(`Datos recuperados de localStorage con clave: ${key}`);
            return JSON.parse(data);
        } else {
            console.warn(`No se encontraron datos en localStorage con clave: ${key}`);
            return null;
        }
    } catch (error) {
        console.error(`Error al recuperar datos de localStorage con clave: ${key}`, error);
        return null;
    }
}

// Función para vaciar datos en localStorage con manejo de errores
function vaciarLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        console.log(`Datos eliminados de localStorage con clave: ${key}`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar datos de localStorage con clave: ${key}`, error);
        return false;
    }
}

// Función para limpiar todo el localStorage
function vaciarTodoLocalStorage() {
    try {
        localStorage.clear();
        console.log("Todos los datos en localStorage han sido eliminados.");
        return true;
    } catch (error) {
        console.error("Error al vaciar todo el localStorage", error);
        return false;
    }
}
