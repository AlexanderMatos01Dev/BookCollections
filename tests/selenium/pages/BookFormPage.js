const { By, until } = require('selenium-webdriver');

class BookFormPage {
  constructor(driver) {
    this.driver = driver;
  }
  
  async fillTitle(title) {
    try {
      const titleInput = await this.driver.findElement(By.css('input[name="title"], input[placeholder*="tít"], input[placeholder*="tit"], input[placeholder*="title"]'));
      await titleInput.clear();
      await titleInput.sendKeys(title);
    } catch (error) {
      console.error('Error al rellenar el título del libro:', error);
      throw error;
    }
  }
  
  async fillAuthor(author) {
    try {
      const authorInput = await this.driver.findElement(By.css('input[name="author"], input[placeholder*="autor"], input[placeholder*="author"]'));
      await authorInput.clear();
      await authorInput.sendKeys(author);
    } catch (error) {
      console.error('Error al rellenar el autor del libro:', error);
      throw error;
    }
  }
  
  async setReadStatus(isRead) {
    try {
      const readCheckbox = await this.driver.findElement(By.css('input[type="checkbox"], [role="switch"], [id="isRead"]'));
      const currentStatus = await readCheckbox.isSelected();
      
      // Solo hacer clic si el estado actual no coincide con el deseado
      if (currentStatus !== isRead) {
        await this.driver.executeScript("arguments[0].click();", readCheckbox);
      }
    } catch (error) {
      console.error('Error al establecer el estado de lectura:', error);
      throw error;
    }
  }
  
  async submitForm() {
    try {
      const submitButton = await this.driver.findElement(By.css('button[type="submit"], form button'));
      await this.driver.executeScript("arguments[0].click();", submitButton);
      await this.driver.sleep(2000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      throw error;
    }
  }
  
  async fillBookForm(bookData) {
    // bookData debe ser un objeto con propiedades title, author y opcionalmente read
    try {
      await this.fillTitle(bookData.title);
      await this.fillAuthor(bookData.author);
      
      if (bookData.read !== undefined) {
        await this.setReadStatus(bookData.read);
      }
      
      await this.submitForm();
    } catch (error) {
      console.error('Error al rellenar el formulario del libro:', error);
      throw error;
    }
  }
}

module.exports = BookFormPage;