// Usando CommonJS para compatibilidad
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

// Utilidad para tomar capturas de pantalla durante las pruebas
const takeScreenshot = async (driver, testName, stepName) => {
  try {
    // Crear directorio si no existe
    const screenshotDir = path.join(__dirname, '../reports/screenshots');
    await fsPromises.mkdir(screenshotDir, { recursive: true });
    
    // Generar nombre de archivo con fecha y hora
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    const fileName = `${testName}_${stepName}_${timestamp}.png`;
    const filePath = path.join(screenshotDir, fileName);
    
    // Tomar captura de pantalla
    const screenshot = await driver.takeScreenshot();
    
    // Guardar captura como archivo PNG
    fs.writeFileSync(filePath, screenshot, 'base64');
    
    console.log(`Captura guardada: ${fileName}`);
    return filePath;
  } catch (error) {
    console.error(`Error al tomar captura: ${error.message}`);
    return null;
  }
};

module.exports = {
  takeScreenshot
};