const { spawn } = require('child_process');
const path = require('path');
const mochaOptions = require('./tests/selenium/config/mochaConfig');

// Función para ejecutar pruebas de Mocha con Selenium
const runTests = (testFile, options = {}) => {
  return new Promise((resolve, reject) => {
    const testPath = path.resolve(__dirname, 'tests', 'selenium', 'tests', testFile);
    
    console.log(`\n🧪 Ejecutando prueba: ${testFile}`);
    
    // Configurar opciones para Mocha
    const mochaArgs = [
      testPath,
      '--timeout', options.timeout || mochaOptions.timeout,
      '--reporter', options.reporter || mochaOptions.reporter
    ];
    
    // Agregar opciones del reportero si las hay
    if (options.reporterOptions || mochaOptions.reporterOptions) {
      const reporterOpts = options.reporterOptions || mochaOptions.reporterOptions;
      if (reporterOpts.reportDir) {
        mochaArgs.push('--reporter-options', `reportDir=${reporterOpts.reportDir}`);
      }
      if (reporterOpts.reportFilename) {
        mochaArgs.push('--reporter-options', `reportFilename=${reporterOpts.reportFilename}`);
      }
    }
    
    // Ejecutar Mocha con Node
    const testProcess = spawn('node', [
      'node_modules/mocha/bin/mocha.js',
      ...mochaArgs
    ]);
    
    testProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    testProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });
    
    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Prueba ${testFile} completada con éxito.`);
        resolve();
      } else {
        console.error(`❌ Prueba ${testFile} falló con código ${code}.`);
        resolve(); // Resolvemos aunque haya error para continuar con las demás pruebas
      }
    });
  });
};

// Función para ejecutar todas las pruebas en secuencia
const runAllTests = async () => {
  const testFiles = [
    '01_add_new_book.test.js',
    '02_edit_book.test.js',
    '03_delete_book.test.js',
    '04_mark_book_as_read.test.js',
    '05_view_all_books.test.js',
    '06_filter_books.test.js',
    '07_data_persistence.test.js',
    '08_book_statistics.test.js',
    '09_book_cover_color.test.js',
    '10_view_book_details.test.js'
  ];
  
  console.log('📚 Iniciando pruebas automatizadas de BookCollections...');
  
  // Ejecutar todas las pruebas en secuencia para evitar conflictos en el WebDriver
  for (const testFile of testFiles) {
    await runTests(testFile);
  }
  
  console.log('\n🎉 ¡Todas las pruebas han sido ejecutadas!');
  console.log('📊 Reporte HTML generado en: /tests/selenium/reports/');
};

// Función para ejecutar una prueba específica
const runSingleTest = async (testNumber) => {
  const testFiles = [
    '01_add_new_book.test.js',
    '02_edit_book.test.js',
    '03_delete_book.test.js',
    '04_mark_book_as_read.test.js',
    '05_view_all_books.test.js'
  ];
  
  const index = parseInt(testNumber) - 1;
  
  if (index >= 0 && index < testFiles.length) {
    const testFile = testFiles[index];
    console.log(`📚 Iniciando prueba de historia de usuario #${testNumber}: ${testFile}`);
    await runTests(testFile);
    console.log('\n✅ Prueba completada');
    console.log('📊 Reporte HTML generado en: /tests/selenium/reports/');
  } else {
    console.error('❌ Número de prueba no válido. Debe estar entre 1 y 10.');
  }
};

// Manejar argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.length > 0 && args[0] === '--test') {
  // Ejecutar una prueba específica
  const testNumber = args[1];
  if (testNumber) {
    runSingleTest(testNumber);
  } else {
    console.error('Por favor, especifica un número de prueba: node run-tests.js --test 1');
  }
} else {
  // Ejecutar todas las pruebas
  runAllTests();
}