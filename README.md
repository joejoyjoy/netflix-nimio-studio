`#homework-assignment` `#nextJS13` `#typescript` `#tailwind` `#prisma-orm`

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-) <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />

# Prueba técnica Nimio Studio gestión de películas CRUD

> Se trata de una aplicatión web creado con NextJS13, TypeScript y una base de datos MySQL con Prisma ORM. El proyecto ha sido creado por Joe Alt para satisfacer la pruba técnica de un gestión de películas para Nimio Studio.

## Index

- [Instalación](#Instalación)
- [Sobre el proyecto](#sobre-el-proyecto)
- [Deploy version](#deploy-version)
- [Creador](#creador-)

## Instalación

- ```
   git clone https://github.com/joejoyjoy/netflix-nimio-studio
  ```
- ```
    cd netflix-nimio-studio
  ```

- ```
    npm install
  ```

- Crea y configura de forma correcto el archivo .env teniendo como referencia el archivo .env.example. Introduce los env keys como proviende en el .env.example y rellenalas con rus propios credentiales.

- ```
    npm run dev
  ```

## Sobre el proyecto

La aplicación web ofrece una página de inicio con todas las películas disponibles. Al hacer clic en una de ellas, puedes acceder a más detalles sobre la película seleccionada. También podrás ver información sobre el director y los actores que forman parte de la película.

Para aquellos que estén registrados y tengan el rol de "Admin", hay una pestaña de panel de administración que permite gestionar y editar películas. Además, puedes crear, modificar y eliminar autores, categorías y directores de películas. Se ha utilizado Zod para verificar que los formularios se creen correctamente desde el lado del backend y para manejar errores en caso de que el usuario cometa algún error.

Las portadas de las películas pueden cargarse desde el disco local y se suben a Cloudinary para almacenarlas en la nube y obtener una URL válida para la portada de la película.

Además, la página de inicio ha sido diseñada para ser responsive con dispositivos móviles y se ha testeado la aplicación en el navegador Chrome.

### Futuras Implementaciones 📕

Here are some potential areas for improvement in the application:

1. **Más Proveedores de Autenticación:** Agregar más opciones de proveedores de autenticación además de GitHub para dar a los usuarios más opciones al registrarse.
2. **Mejora de la Interfaz de Usuario:** Continuar mejorando la interfaz de usuario y la experiencia del usuario en dispositivos móviles y de escritorio.
3. **Sistema de Calificación:** Implementar un sistema de calificación para que los usuarios puedan calificar las películas y ver las calificaciones promedio.
4. **Detalles sobre Director y Actores** Implementar una option de leer las biofrafias de los directores y actores de la pelicula.

## Versión deployada

#### Simplemente quieres ver la página en actión?

Buenas notifias! Aquí tienes una versión deployada para acceder.
Entra en [netflix-nimio-studio.vercel.app](https://netflix-nimio-studio.vercel.app/) para explorar la aplicación sin tener que descargar y configurar antes.

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

Este proyecto esta licienciado por MIT License
