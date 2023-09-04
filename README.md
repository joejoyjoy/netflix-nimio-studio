`#homework-assignment` `#nextJS13` `#typescript` `#tailwind` `#prisma-orm`

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-) <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />

# Prueba técnica Nimio Studio: Gestión de Películas CRUD

> Se trata de una aplicación web creada con Next.js 13, TypeScript y una base de datos MySQL utilizando Prisma ORM. El proyecto ha sido creado por Joe Alt para cumplir con la prueba técnica de gestión de películas para Nimio Studio.

## Índice

- [Instalación](#instalación)
- [Sobre el proyecto](#sobre-el-proyecto)
- [Versión desplegada](#versión-desplegada)
- [Creador](#creador)
- [Licencia](#licencia)

## Instalación

1. Clona el repositorio:

```
git clone https://github.com/joejoyjoy/netflix-nimio-studio
```

2. Ve al directorio del proyecto:

```
cd netflix-nimio-studio
```

3. Instala las dependencias:

```
npm install
```

4. Crea y configura correctamente el archivo .env siguiendo las instrucciones en el archivo .env.example. Introduce las claves de entorno según se indican en el .env.example y rellénalas con tus propias credenciales.

5. Ejecuta la aplicación en modo de desarrollo:

```
npm run dev
```

## Sobre el proyecto

La aplicación web ofrece una página de inicio con todas las películas disponibles. Al hacer clic en una de ellas, puedes acceder a más detalles sobre la película seleccionada. También podrás ver información sobre el director y los actores que forman parte de la película.

Para aquellos que estén registrados y tengan el rol de "Admin", hay una pestaña de panel de administración que permite gestionar y editar películas. Además, puedes crear, modificar y eliminar autores, categorías y directores de películas. Se ha utilizado Zod para verificar que los formularios se creen correctamente desde el lado del backend y para manejar errores en caso de que el usuario cometa algún error.

Las portadas de las películas pueden cargarse desde el disco local y se suben a Cloudinary para almacenarlas en la nube y obtener una URL válida para la portada de la película.

Además, la página de inicio ha sido diseñada para ser responsive con dispositivos móviles y se ha testeado la aplicación en el navegador Chrome.

### Futuras Implementaciones 📕

Aquí hay algunas áreas potenciales de mejora en la aplicación:

1. **Más Proveedores de Autenticación:** Agregar más opciones de proveedores de autenticación además de GitHub para dar a los usuarios más opciones al registrarse.
2. **Mejora de la Interfaz de Usuario:** Continuar mejorando la interfaz de usuario y la experiencia del usuario en dispositivos móviles y de escritorio.
3. **Sistema de Calificación:** Implementar un sistema de calificación para que los usuarios puedan calificar las películas y ver las calificaciones promedio.
4. **Detalles sobre el Director y Actores:** Implementar una opción para leer las biografías de los directores y actores de la película.

## Versión desplegada

#### ¿Quieres ver la página en acción?

¡Buenas noticias! Aquí tienes una versión desplegada para explorar. Visita [netflix-nimio-studio.vercel.app](https://netflix-nimio-studio.vercel.app/) para explorar la aplicación sin tener que descargarla y configurarla previamente.

## Creador ✨

<table>
<tbody>
  <tr>
    <td align="center">
      <a href="https://github.com/joejoyjoy">
        <img src="https://avatars.githubusercontent.com/u/73751755" width="100px" alt="Joe Alt"/>
        <br />
        <sub>
        <b>Joe Alt</b>
        </sub>
      </a>
      <br />
      <a href="#developer-joe" title="code-tools-maintenance-design">💻🔧🚧🎨</a>
    </td>
  </tr>
</tbody>
</table>

## Licencia

Este proyecto está bajo la Licencia MIT.
