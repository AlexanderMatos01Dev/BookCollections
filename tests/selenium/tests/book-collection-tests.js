const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { setupChromeDriver } = require('../config/chromeConfig');
const { takeScreenshot } = require('../utils/screenshot');
const HomePage = require('../pages/HomePage');
const BookFormPage = require('../pages/BookFormPage');

describe('Pruebas de la Aplicación BookCollections', function() {
  // Configuramos un timeout más largo para Mocha ya que las pruebas de interfaz pueden ser lentas
  this.timeout(60000);
  
  let driver;
  let homePage;
  let bookFormPage;
  
  // Hook que se ejecuta antes de todas las pruebas
  before(async function() {
    // Inicializar el driver de Chrome
    driver = await setupChromeDriver();
    
    // Inicializar las clases de página
    homePage = new HomePage(driver);
    bookFormPage = new BookFormPage(driver);
    
    // Navegar a la página principal para comenzar las pruebas
    await homePage.navigate();
  });
  
  // Hook que se ejecuta después de todas las pruebas
  after(async function() {
    // Cerrar el navegador al finalizar
    if (driver) {
      await driver.quit();
    }
  });
  
  // Prueba 1: Añadir un nuevo libro a la colección
  it('Debería poder añadir un nuevo libro a la colección', async function() {
    // Capturar el número inicial de libros
    const initialBookCount = await homePage.getBookCount();
    
    // Hacer clic en el botón para añadir un libro
    await homePage.clickAddBookButton();
    
    // Esperar a que se cargue el formulario
    await bookFormPage.waitForForm();
    
    // Datos del nuevo libro
    const newBook = {
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      genre: 'Ficción',
      pages: '417',
      read: true,
      color: 'green'
    };
    
    // Rellenar el formulario con los datos del nuevo libro
    await bookFormPage.fillBookForm(newBook);
    
    // Tomar una captura de pantalla antes de guardar
    await takeScreenshot(driver, 'add_new_book', 'before_save');
    
    // Hacer clic en el botón de guardar
    await bookFormPage.clickSaveButton();
    
    // Esperar a que se actualice la lista de libros (regreso a la página principal)
    await driver.sleep(1000);
    
    // Verificar que se ha añadido un nuevo libro
    const finalBookCount = await homePage.getBookCount();
    
    // Tomar una captura de pantalla después de guardar
    await takeScreenshot(driver, 'add_new_book', 'after_save');
    
    // Comprobar que el número de libros ha aumentado
    expect(finalBookCount).to.be.greaterThan(initialBookCount, 'El número de libros debería haber aumentado');
  });
  
  // Prueba 2: Editar un libro existente
  it('Debería poder editar un libro existente', async function() {
    // Verificar que hay al menos un libro para editar
    const bookCount = await homePage.getBookCount();
    if (bookCount === 0) {
      // Si no hay libros, primero añadimos uno
      await homePage.clickAddBookButton();
      await bookFormPage.waitForForm();
      
      const newBook = {
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        genre: 'Clásico',
        pages: '863',
        read: false
      };
      
      await bookFormPage.fillBookForm(newBook);
      await bookFormPage.clickSaveButton();
      await driver.sleep(1000);
    }
    
    // Obtener los detalles del primer libro antes de la edición
    const bookDetailsBefore = await homePage.getBookDetails(0);
    
    // Hacer clic en el botón editar del primer libro
    await homePage.clickEditBookButton(0);
    
    // Esperar a que se cargue el formulario de edición
    await bookFormPage.waitForForm();
    
    // Verificar que estamos en el modo de edición
    const formTitle = await bookFormPage.getFormTitle();
    expect(formTitle.toLowerCase()).to.include('edit', 'El formulario debería estar en modo edición');
    
    // Datos para editar el libro
    const editedBook = {
      title: 'El Quijote Revisado',
      author: 'Miguel de Cervantes Saavedra',
      pages: '900',
      read: true
    };
    
    // Rellenar el formulario con los nuevos datos
    await bookFormPage.fillBookForm(editedBook);
    
    // Tomar una captura de pantalla antes de guardar
    await takeScreenshot(driver, 'edit_book', 'before_save');
    
    // Guardar cambios
    await bookFormPage.clickSaveButton();
    
    // Esperar a que se actualice la lista de libros
    await driver.sleep(1000);
    
    // Obtener los detalles del libro después de la edición
    const bookDetailsAfter = await homePage.getBookDetails(0);
    
    // Tomar una captura de pantalla después de guardar
    await takeScreenshot(driver, 'edit_book', 'after_save');
    
    // Comprobar que el título del libro ha cambiado
    expect(bookDetailsAfter.title).to.not.equal(bookDetailsBefore.title, 'El título del libro debería haber cambiado');
  });
  
  // Prueba 3: Filtrar libros por estado de lectura
  it('Debería poder filtrar libros por estado de lectura', async function() {
    // Asegurarse que hay al menos un libro leído y uno no leído
    const bookCount = await homePage.getBookCount();
    
    if (bookCount < 2) {
      // Añadir un libro con read=true
      await homePage.clickAddBookButton();
      await bookFormPage.waitForForm();
      await bookFormPage.fillBookForm({
        title: 'Libro Leído de Prueba',
        author: 'Autor de Prueba',
        read: true
      });
      await bookFormPage.clickSaveButton();
      await driver.sleep(1000);
      
      // Añadir otro libro con read=false
      await homePage.clickAddBookButton();
      await bookFormPage.waitForForm();
      await bookFormPage.fillBookForm({
        title: 'Libro No Leído de Prueba',
        author: 'Autor de Prueba',
        read: false
      });
      await bookFormPage.clickSaveButton();
      await driver.sleep(1000);
    }
    
    // Obtener el número total de libros
    const totalBookCount = await homePage.getBookCount();
    expect(totalBookCount).to.be.at.least(2, 'Debería haber al menos 2 libros para la prueba');
    
    // Filtrar por libros leídos
    await homePage.filterReadBooks();
    await driver.sleep(1000);
    
    // Tomar una captura de pantalla de los libros leídos
    await takeScreenshot(driver, 'filter_books', 'read_books');
    
    // Obtener el número de libros leídos
    const readBookCount = await homePage.getBookCount();
    
    // Filtrar por libros no leídos
    await homePage.filterUnreadBooks();
    await driver.sleep(1000);
    
    // Tomar una captura de pantalla de los libros no leídos
    await takeScreenshot(driver, 'filter_books', 'unread_books');
    
    // Obtener el número de libros no leídos
    const unreadBookCount = await homePage.getBookCount();
    
    // Filtrar para ver todos los libros
    await homePage.filterAllBooks();
    await driver.sleep(1000);
    
    // Comprobar que la suma de libros leídos y no leídos es igual al total
    expect(readBookCount + unreadBookCount).to.equal(totalBookCount, 
      'La suma de libros leídos y no leídos debe ser igual al total');
  });
  
  // Prueba 4: Eliminar un libro de la colección
  it('Debería poder eliminar un libro de la colección', async function() {
    // Verificar que hay al menos un libro para eliminar
    const initialBookCount = await homePage.getBookCount();
    
    if (initialBookCount === 0) {
      // Si no hay libros, primero añadimos uno
      await homePage.clickAddBookButton();
      await bookFormPage.waitForForm();
      await bookFormPage.fillBookForm({
        title: 'Libro para Eliminar',
        author: 'Autor Temporal'
      });
      await bookFormPage.clickSaveButton();
      await driver.sleep(1000);
    }
    
    // Capturar el número de libros antes de eliminar
    const bookCountBeforeDelete = await homePage.getBookCount();
    expect(bookCountBeforeDelete).to.be.at.least(1, 'Debería haber al menos un libro para eliminar');
    
    // Tomar una captura de pantalla antes de eliminar
    await takeScreenshot(driver, 'delete_book', 'before_delete');
    
    // Hacer clic en el botón eliminar del primer libro
    await homePage.clickDeleteBookButton(0);
    
    // Esperar a que se actualice la lista de libros (puede haber un diálogo de confirmación)
    await driver.sleep(1500);
    
    // Si hay un diálogo de confirmación, intentar confirmar
    try {
      // Buscar y hacer clic en el botón "Confirmar" o "Eliminar" en el diálogo
      const confirmButton = await driver.findElement(By.xpath(
        "//button[contains(text(), 'Confirmar') or contains(text(), 'Delete') or contains(text(), 'Eliminar') or contains(text(), 'Aceptar')]"
      ));
      await driver.executeScript("arguments[0].click();", confirmButton);
      await driver.sleep(1000);
    } catch (e) {
      // Si no hay diálogo de confirmación, continuamos con la prueba
    }
    
    // Tomar una captura de pantalla después de eliminar
    await takeScreenshot(driver, 'delete_book', 'after_delete');
    
    // Obtener el número de libros después de eliminar
    const bookCountAfterDelete = await homePage.getBookCount();
    
    // Comprobar que el número de libros ha disminuido
    expect(bookCountAfterDelete).to.equal(bookCountBeforeDelete - 1, 
      'El número de libros debería haber disminuido en 1');
  });
  
  // Prueba 5: Cancelar la edición de un libro
  it('Debería poder cancelar la edición de un libro sin aplicar cambios', async function() {
    // Verificar que hay al menos un libro para editar
    const bookCount = await homePage.getBookCount();
    if (bookCount === 0) {
      // Si no hay libros, primero añadimos uno
      await homePage.clickAddBookButton();
      await bookFormPage.waitForForm();
      
      const newBook = {
        title: 'Libro de Prueba para Cancelar',
        author: 'Autor de Prueba',
        pages: '100'
      };
      
      await bookFormPage.fillBookForm(newBook);
      await bookFormPage.clickSaveButton();
      await driver.sleep(1000);
    }
    
    // Obtener los detalles del libro antes de la edición
    const bookDetailsBefore = await homePage.getBookDetails(0);
    
    // Hacer clic en el botón editar del libro
    await homePage.clickEditBookButton(0);
    
    // Esperar a que se cargue el formulario
    await bookFormPage.waitForForm();
    
    // Realizar cambios en el formulario
    await bookFormPage.fillBookForm({
      title: 'Este Título No Debería Guardarse',
      author: 'Este Autor No Debería Guardarse'
    });
    
    // Tomar una captura de pantalla antes de cancelar
    await takeScreenshot(driver, 'cancel_edit', 'before_cancel');
    
    // Hacer clic en el botón de cancelar
    await bookFormPage.clickCancelButton();
    
    // Esperar a que se vuelva a la lista de libros
    await driver.sleep(1000);
    
    // Tomar una captura de pantalla después de cancelar
    await takeScreenshot(driver, 'cancel_edit', 'after_cancel');
    
    // Obtener los detalles del libro después de la cancelación
    const bookDetailsAfter = await homePage.getBookDetails(0);
    
    // Comprobar que los datos del libro no han cambiado
    expect(bookDetailsAfter.title).to.equal(bookDetailsBefore.title, 
      'El título del libro no debería haber cambiado al cancelar la edición');
    expect(bookDetailsAfter.author).to.equal(bookDetailsBefore.author, 
      'El autor del libro no debería haber cambiado al cancelar la edición');
  });
});