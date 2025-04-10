// Formato CommonJS para compatibilidad con run-tests.js
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Función para configurar y devolver un driver de Chrome
async function setupChromeDriver() {
  // Configurar opciones de Chrome
  const options = new chrome.Options();
  
  // Configuraciones para mejorar la estabilidad en entornos CI/CD
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1280,720');
  
  // En entorno de producción o CI, usar modo headless
  if (process.env.CI || process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }
  
  // Configurar y crear el driver
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  
  // Configurar timeouts
  await driver.manage().setTimeouts({
    implicit: 10000,       // Espera implícita para elementos
    pageLoad: 30000,       // Espera máxima para carga de página
    script: 30000          // Espera máxima para ejecución de scripts
  });
  
  return driver;
}

module.exports = {
  setupChromeDriver
};