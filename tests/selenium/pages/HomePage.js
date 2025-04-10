const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:3000';
  }
  
  async navigate() {
    await this.driver.get(this.baseUrl);
    await this.driver.wait(until.elementLocated(By.css('body')), 10000);
    console.log('Navegación a la página de inicio completada');
  }
  
  async getAllBooks() {
    return await this.driver.findElements(By.css('.grid > div, .book-list > div, .card, [class*="card"]'));
  }
  
  async filterByReadStatus(status) {
    // status puede ser: 'all', 'read', 'unread'
    const filterMap = {
      'all': 0,
      'read': 1,
      'unread': 2
    };
    
    const index = filterMap[status] || 0;
    const filters = await this.driver.findElements(By.css('.filter-tabs button, .tabs button'));
    
    if (filters.length > index) {
      await this.driver.executeScript("arguments[0].click();", filters[index]);
      await this.driver.sleep(1000);
    }
  }
  
  async clickAddBookButton() {
    try {
      const addButton = await this.driver.findElement(By.css('button.primary, a.primary, button[aria-label="Add"], button[aria-label="Añadir"]'));
      await this.driver.executeScript("arguments[0].click();", addButton);
      await this.driver.sleep(1000);
    } catch (error) {
      console.error('Error al hacer clic en el botón de añadir libro:', error);
      throw error;
    }
  }
  
  async getBookByTitle(title) {
    const books = await this.getAllBooks();
    
    for (const book of books) {
      try {
        const titleElement = await book.findElement(By.css('h2, h3, [class*="title"]'));
        const bookTitle = await titleElement.getText();
        
        if (bookTitle.includes(title)) {
          return book;
        }
      } catch (e) {
        // Continuar con el siguiente libro
      }
    }
    
    return null;
  }
  
  async clickEditButton(bookElement) {
    try {
      const editButton = await bookElement.findElement(By.css('button[aria-label="Edit"], button[aria-label="Editar"], button:first-child'));
      await this.driver.executeScript("arguments[0].click();", editButton);
      await this.driver.sleep(1000);
    } catch (error) {
      console.error('Error al hacer clic en el botón de editar:', error);
      throw error;
    }
  }
  
  async clickDeleteButton(bookElement) {
    try {
      const deleteButton = await bookElement.findElement(By.css('button[aria-label="Delete"], button[aria-label="Eliminar"], button:last-child'));
      await this.driver.executeScript("arguments[0].click();", deleteButton);
      await this.driver.sleep(1000);
    } catch (error) {
      console.error('Error al hacer clic en el botón de eliminar:', error);
      throw error;
    }
  }
  
  async confirmDelete() {
    try {
      const confirmButton = await this.driver.findElement(By.css('.dialog button:last-child, .modal button:last-child, [role="dialog"] button:last-child'));
      await this.driver.executeScript("arguments[0].click();", confirmButton);
      await this.driver.sleep(1000);
    } catch (error) {
      console.error('Error al confirmar la eliminación:', error);
      throw error;
    }
  }
}

module.exports = HomePage;