/**
 * Función auxiliar para comparar títulos de forma flexible
 */
function titulosSimilares(titulo1, titulo2) {
  if (!titulo1 || !titulo2) return false;
  
  // Convertimos a minúsculas y quitamos espacios extra
  const t1 = titulo1.toLowerCase().trim();
  const t2 = titulo2.toLowerCase().trim();
  
  // Comparaciones directas
  if (t1 === t2) return true;
  if (t1.includes(t2) || t2.includes(t1)) return true;
  
  // Comparación de palabras significativas
  const palabras1 = t1.split(/\s+/);
  const palabras2 = t2.split(/\s+/);
  
  // Si alguna palabra significativa coincide (excluyendo artículos y preposiciones cortas)
  const palabrasSignificativas = palabras1.filter(p => p.length > 3);
  return palabrasSignificativas.some(p => t2.includes(p));
}

/**
 * Configura el entorno de prueba con un driver compartido
 * @param {Object} mocha - Objeto de contexto de la prueba (this)
 * @returns {Promise<{driver: WebDriver, homePage: HomePage, bookFormPage: BookFormPage}>}
 */
async function setupTestEnvironment(mocha) {
  const { By, until, Key } = require('selenium-webdriver');
  const { setupChromeDriver } = require('../config/chromeConfig');
  const HomePage = require('../pages/HomePage');
  const BookFormPage = require('../pages/BookFormPage');
  
  // Aumentamos el timeout de las pruebas para dar más margen
  mocha.timeout(30000);

  // Inicializamos el driver y las páginas
  const driver = await setupChromeDriver();
  const homePage = new HomePage(driver);
  const bookFormPage = new BookFormPage(driver);
  
  // Evitamos errores por timeouts estableciendo wait implícito
  await driver.manage().setTimeouts({ implicit: 5000 });
  
  // Registramos la limpieza para after
  mocha.afterEach(async function() {
    // Captura de pantalla en caso de fallo
    if (this.currentTest && this.currentTest.state === 'failed') {
      const { takeScreenshot } = require('../utils/screenshot');
      await takeScreenshot(driver, this.currentTest.title.replace(/\s+/g, '_').toLowerCase(), 'error');
    }
  });

  // Registramos la limpieza para after all
  mocha.after(async function() {
    // Cerramos el driver si existe
    if (driver) {
      try {
        await driver.quit();
      } catch (error) {
        console.error("Error al cerrar el driver:", error);
      }
    }
  });
  
  return { driver, homePage, bookFormPage };
}

/**
 * Función para manejar errores comunes y evitar fallos en las pruebas
 * @param {Error} error - Error capturado
 * @param {string} message - Mensaje personalizado
 * @param {WebDriver} driver - Driver de selenium
 */
async function handleTestError(error, message, driver) {
  console.error(`${message}: ${error.message}`);
  
  // Si hay un error de StaleElementReferenceError, intentamos refrescar la página
  if (error.name === 'StaleElementReferenceError') {
    console.log('Elemento obsoleto detectado, intentando refrescar...');
    try {
      await driver.navigate().refresh();
      await driver.sleep(1000);
    } catch (refreshError) {
      console.error('No se pudo refrescar la página:', refreshError);
    }
  }
  
  // Si hay un error de sesión, intentamos reconectar
  if (error.message && error.message.includes('session')) {
    console.log('Error de sesión detectado, intentando reconectar...');
    // Aquí podríamos implementar un sistema de reconexión
  }
  
  throw error; // Re-lanzar el error para que la prueba falle adecuadamente
}

/**
 * Espera hasta que un elemento sea interactuable y luego hace clic
 * @param {WebDriver} driver - Driver de selenium
 * @param {By} locator - Localizador del elemento
 * @param {number} timeoutMs - Tiempo de espera en milisegundos
 * @returns {Promise<boolean>} - true si se hizo clic, false si no
 */
async function waitAndClick(driver, locator, timeoutMs = 5000) {
  try {
    const element = await driver.wait(until.elementLocated(locator), timeoutMs);
    await driver.wait(until.elementIsVisible(element), timeoutMs);
    await driver.wait(until.elementIsEnabled(element), timeoutMs);
    
    // Intentar hacer scroll al elemento antes de hacer clic
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    await driver.sleep(500);
    
    await element.click();
    return true;
  } catch (error) {
    console.error(`No se pudo hacer clic en el elemento: ${error.message}`);
    return false;
  }
}

module.exports = {
  titulosSimilares,
  setupTestEnvironment,
  handleTestError,
  waitAndClick
};
