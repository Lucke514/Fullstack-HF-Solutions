# React + TypeScript + Vite

# HF Solutions – Frontend Technical Test

Este frontend fue desarrollado utilizando **React con Vite**, ya que inicialmente había considerado Next.js, pero al final se realizó de forma nativa en React.

Para la interfaz de usuario utilicé **Shadcn UI**, junto con **React Hook Form** para el manejo de formularios, **Zod** para validaciones tipadas y **Axios** para el consumo de la API REST que también desarrollé para la prueba. El estado y la lógica de consumo se organizaron mediante **hooks personalizados**.

La UI está basada en **Shadcn**, desde donde tomé referencias para el componente componentes de `ProductList` y otros componentes nativos de shadcn como diálogos, formularios y tabs.

La estructura completa del proyecto se encuentra detallada en el archivo **estructura.md** dentro del repositorio.

---

## Estructura general

La estructura está organizada de forma modular:

- **components/** dividido por dominio (`categories` y `products`), más los componentes UI generados con Shadcn.  
- **shared/** con interfaces, servicios y validaciones(zod).  
- **hooks/** para abstraer la lógica del consumo de API.  
- **config/** con el cliente de Axios centralizado.  
- **lib/** con utilidades comunes.

Esta organización permite mantener una arquitectura limpia, reutilizable y fácil de extender.
