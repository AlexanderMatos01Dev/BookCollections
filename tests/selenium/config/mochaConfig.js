// Formato CommonJS para compatibilidad con run-tests.js
module.exports = {
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './tests/selenium/reports',
    reportFilename: 'book-collections-test-report',
    quiet: true,
    html: true,
    json: true
  },
  timeout: 60000 // Timeout global de 60 segundos para todas las pruebas
};