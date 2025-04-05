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

## Historias de Usuario

1. **Como usuario, quiero añadir un nuevo libro a mi colección**
   - Puedo ingresar título, autor, género, número de páginas
   - Puedo seleccionar un color para la portada
   - Puedo marcar si ya he leído el libro

2. **Como usuario, quiero ver todos los libros en mi colección**
   - Puedo ver los libros en un formato de tarjetas visual
   - Puedo ver información clave como título, autor y género

3. **Como usuario, quiero filtrar mis libros**
   - Puedo ver todos mis libros
   - Puedo ver solo los libros que he leído
   - Puedo ver solo los libros que no he leído

4. **Como usuario, quiero editar la información de un libro**
   - Puedo modificar cualquier detalle del libro
   - Los cambios se guardan y persisten

5. **Como usuario, quiero eliminar libros de mi colección**
   - Puedo eliminar libros que ya no deseo tener en mi colección

6. **Como usuario, quiero que mi colección se guarde**
   - Mi colección se mantiene incluso después de cerrar el navegador

## Instalación y Configuración

### Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/book-collection-manager.git
   cd book-collection-manager
   
