# 📚 Book Collection Manager

## Descripción General

Book Collection Manager es una aplicación web que permite a los usuarios gestionar su biblioteca personal de forma sencilla e intuitiva. Esta aplicación CRUD (Create, Read, Update, Delete) permite añadir, visualizar, editar y eliminar libros de una colección personal, con persistencia de datos mediante localStorage para mantener la información entre sesiones.

La aplicación está diseñada con una arquitectura modular y una clara separación de responsabilidades, lo que facilita su mantenimiento y extensión. Utiliza React con TypeScript para garantizar un código robusto y tipado.

## Características Principales

- ✅ **Gestión completa de libros**: Añadir, ver, editar y eliminar libros
- 📊 **Filtrado de libros**: Ver todos los libros, solo los leídos o solo los no leídos
- 🎨 **Personalización visual**: Asignar colores a las portadas de los libros
- 💾 **Persistencia de datos**: Almacenamiento local para mantener la colección entre sesiones
- 📱 **Diseño responsivo**: Funciona en dispositivos de todos los tamaños
- 🔍 **Organización por géneros**: Clasificación de libros por géneros literarios
- ✓ **Estado de lectura**: Marcar libros como leídos o no leídos

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Next.js**: Framework de React para aplicaciones web
- **Tailwind CSS**: Framework de CSS para diseño rápido y responsivo
- **shadcn/ui**: Componentes de UI reutilizables y accesibles
- **Lucide React**: Biblioteca de iconos
- **LocalStorage API**: Para persistencia de datos en el navegador

## Arquitectura del Sistema

La aplicación sigue una arquitectura de componentes con clara separación de responsabilidades:

1. **Capa de Datos**:
   - Servicios para operaciones CRUD
   - Utilidades para interacción con localStorage

2. **Capa de Presentación**:
   - Componentes de UI reutilizables
   - Componentes específicos para la gestión de libros

3. **Capa de Estado**:
   - Estado local con React Hooks
   - Persistencia con localStorage

4. **Capa de Tipos**:
   - Interfaces TypeScript para garantizar consistencia de tipos

El flujo de datos sigue un patrón unidireccional, donde los eventos del usuario desencadenan acciones que modifican el estado, y los cambios en el estado provocan re-renderizados de los componentes.

## Roles de Usuario

La aplicación está diseñada para un único rol de usuario:

- **Usuario**: Persona que gestiona su colección personal de libros. Tiene acceso completo a todas las funcionalidades de la aplicación.

# Historias de Usuario y Criterios de Aceptación/Rechazo

---

## 1. Añadir un nuevo libro a la colección

**Como** usuario de la aplicación  
**Quiero** poder añadir nuevos libros a mi colección  
**Para** mantener un registro de los libros que poseo o me interesan

### Criterios de Aceptación
- El formulario debe incluir campos para: título, autor, género, número de páginas, estado de lectura y color de portada.
- Todos los campos obligatorios deben estar validados antes de enviar el formulario.
- El título y autor son campos obligatorios.
- Tras añadir exitosamente un libro, debe aparecer en la lista de libros.
- El libro añadido debe guardarse en el almacenamiento local para persistir entre sesiones.
- El nuevo libro debe aparecer al principio de la lista de libros.
- Debe generarse automáticamente un ID único para el libro.
- Debe registrarse la fecha de adición automáticamente.

### Criterios de Rechazo
- Si el título o el autor están vacíos, el formulario no debe enviarse.
- Si se omite guardar en el almacenamiento local, el libro no debe considerarse añadido correctamente.
- Si el libro aparece al final de la lista, se considera incorrecto.
- Si se permite guardar un libro sin fecha de adición, se rechaza.
- Si el ID no es único, el comportamiento debe ser rechazado.

---

## 2. Editar un libro existente

**Como** usuario de la aplicación  
**Quiero** poder editar la información de los libros ya añadidos  
**Para** corregir errores o actualizar datos

### Criterios de Aceptación
- Al hacer clic en el botón de editar, debe abrirse un diálogo con el formulario precargado con los datos actuales.
- Todos los campos deben poder modificarse.
- Debe validarse la información antes de guardar los cambios.
- Al guardar, la lista de libros debe actualizarse inmediatamente con los datos modificados.
- Los cambios deben persistir en el almacenamiento local.
- Debe existir la opción de cancelar la edición sin aplicar cambios.

### Criterios de Rechazo
- Si los cambios no se reflejan en la lista al guardar, se rechaza.
- Si los datos modificados no persisten tras recargar la página, se considera erróneo.
- Si no es posible cancelar sin guardar cambios, se considera fallo.
- Si el formulario no se precarga con la información actual, no cumple los requisitos.

---

## 3. Eliminar un libro de la colección

**Como** usuario de la aplicación  
**Quiero** poder eliminar libros de mi colección  
**Para** mantener actualizada mi lista de libros

### Criterios de Aceptación
- Cada libro debe tener un botón de eliminación.
- Al hacer clic en eliminar, el libro debe ser removido inmediatamente de la lista.
- La eliminación debe ser persistente, guardándose en el almacenamiento local.
- La interfaz debe actualizarse sin necesidad de recargar la página.
- Los contadores de libros (total, leídos, no leídos) deben actualizarse correctamente.

### Criterios de Rechazo
- Si el libro eliminado vuelve a aparecer al recargar, se considera fallo.
- Si se requiere recargar la página para reflejar la eliminación, se rechaza.
- Si los contadores no se ajustan correctamente tras eliminar, se considera erróneo.

---

## 4. Marcar un libro como leído/no leído

**Como** usuario de la aplicación  
**Quiero** poder marcar libros como leídos o no leídos  
**Para** hacer seguimiento de mi progreso de lectura

### Criterios de Aceptación
- Debe existir un interruptor o casilla de verificación para marcar un libro como leído.
- Al editar un libro, debe poder cambiarse su estado de lectura.
- Los cambios en el estado de lectura deben reflejarse inmediatamente en la interfaz.
- Los libros marcados como leídos deben mostrar un indicador visual (insignia o icono).
- El cambio debe persistir en el almacenamiento local.
- El libro debe aparecer correctamente en las pestañas filtradas por estado de lectura.

### Criterios de Rechazo
- Si el cambio de estado no se guarda localmente, se considera fallo.
- Si el indicador visual no cambia tras marcar como leído/no leído, se rechaza.
- Si la lista filtrada no refleja correctamente el nuevo estado, se considera erróneo.

---

## 5. Filtrar libros por estado de lectura

**Como** usuario de la aplicación  
**Quiero** poder filtrar mis libros por estado de lectura  
**Para** ver fácilmente qué libros he leído y cuáles no

### Criterios de Aceptación
- La interfaz debe tener pestañas o botones para filtrar por: "Todos los libros", "Leídos" y "No leídos".
- Al cambiar de filtro, la lista de libros debe actualizarse inmediatamente.
- Cada pestaña debe mostrar la cantidad de libros que contiene entre paréntesis.
- Si no hay libros en una categoría, debe mostrarse un mensaje apropiado.
- La navegación entre pestañas debe ser fluida sin recargar la página.
- El filtro seleccionado debe resaltarse visualmente.

### Criterios de Rechazo
- Si cambiar de pestaña requiere recargar la página, se rechaza.
- Si los números de libros por categoría no son correctos, se considera fallo.
- Si no se muestra el mensaje de vacío al no haber libros, se rechaza.

---

## 6. Ver detalles de un libro

**Como** usuario de la aplicación  
**Quiero** poder ver los detalles completos de cada libro en mi colección  
**Para** consultar su información cuando lo necesite

### Criterios de Aceptación
- Cada libro debe mostrarse en una tarjeta con toda su información relevante.
- La tarjeta debe mostrar: título, autor, género, número de páginas, estado de lectura, fecha de adición.
- El color de portada debe ser visible como fondo de un área en la tarjeta.
- Si el libro está marcado como leído, debe mostrar un indicador visual claro.
- La información debe estar organizada de manera legible y estéticamente agradable.
- La fecha debe mostrarse en un formato legible y localizado.

### Criterios de Rechazo
- Si falta alguna información obligatoria en la tarjeta, se rechaza.
- Si el color de portada no se refleja visualmente, se considera incorrecto.
- Si la fecha no es legible o tiene formato incorrecto, se considera error.

---

## 7. Personalizar el color de la portada del libro

**Como** usuario de la aplicación  
**Quiero** poder seleccionar un color para la portada de cada libro  
**Para** identificarlos visualmente y personalizar mi colección

### Criterios de Aceptación
- Al añadir o editar un libro, debe existir un selector de color para la portada.
- Deben estar disponibles al menos 8 opciones de colores: rojo, verde, azul, morado, amarillo, naranja, rosa, verde azulado.
- El color seleccionado debe visualizarse en la tarjeta del libro.
- Cada color debe tener una representación visual en el selector (no solo texto).
- Debe existir un color por defecto en caso de no seleccionar ninguno.
- El color debe persistir en el almacenamiento local junto con los demás datos del libro.

### Criterios de Rechazo
- Si se permite guardar sin color por defecto ni seleccionado, se rechaza.
- Si el selector no muestra los colores visualmente, no cumple los requisitos.
- Si el color no se refleja en la tarjeta, se considera fallo.

---

## 8. Ver un resumen estadístico de la colección

**Como** usuario de la aplicación  
**Quiero** poder ver un resumen de mi colección de libros  
**Para** tener una visión general de mi biblioteca

### Criterios de Aceptación
- La interfaz debe mostrar el número total de libros en la colección.
- Debe mostrarse el número de libros leídos y no leídos.
- Estos contadores deben actualizarse automáticamente al añadir, editar o eliminar libros.
- Los contadores deben estar visibles en las pestañas de filtrado.
- La información debe ser precisa y consistente con los datos almacenados.

### Criterios de Rechazo
- Si los contadores muestran cifras incorrectas, se considera error.
- Si no se actualizan automáticamente tras acciones, se rechaza.
- Si la información no coincide con los libros realmente guardados, es incorrecto.

---

## 9. Seleccionar el género del libro

**Como** usuario de la aplicación  
**Quiero** poder seleccionar el género de cada libro de una lista predefinida  
**Para** categorizar mi colección de manera consistente

### Criterios de Aceptación
- Al añadir o editar un libro, debe existir un selector de género con opciones predefinidas.
- Los géneros disponibles deben incluir: Ficción, No Ficción, Ciencia Ficción, Fantasía, Misterio, Thriller, Romance, Biografía, Historia, Autoayuda.
- El género debe mostrarse como una insignia en la tarjeta del libro.
- Debe existir un género predeterminado (Ficción).
- El género seleccionado debe persistir en el almacenamiento local.

### Criterios de Rechazo
- Si se permite guardar un libro sin género, se rechaza.
- Si el género no se visualiza en la tarjeta, se considera incorrecto.
- Si el selector permite escribir géneros no predefinidos, se considera fallo.

---

## 10. Indicación visual cuando la colección está vacía

**Como** usuario nuevo de la aplicación  
**Quiero** recibir indicaciones claras cuando mi colección está vacía  
**Para** entender cómo empezar a usar la aplicación

### Criterios de Aceptación
- Cuando no hay libros en la colección, debe mostrarse un mensaje indicando que la colección está vacía.
- El mensaje debe ser amigable y orientar al usuario a añadir su primer libro.
- El mensaje debe ser visible en la sección principal de visualización de libros.
- El mensaje debe desaparecer automáticamente cuando se añade un libro.
- El mensaje debe ser consistente con el diseño visual de la aplicación.

### Criterios de Rechazo
- Si no se muestra ningún mensaje con la colección vacía, se considera fallo.
- Si el mensaje no desaparece al añadir un libro, se rechaza.
- Si el mensaje no guía al usuario de forma clara, se considera incorrecto.



## Instalación y Configuración

### Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/book-collection-manager.git
   cd book-collection-manager
   
