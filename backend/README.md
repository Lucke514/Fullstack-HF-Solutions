<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# HF Solutions – Backend Technical Test

Opté por implementar la solución con **NestJS utilizando la Express Platform**, ya que es una forma que permite automatizar procesos importantes como el uso de **Class Validation**, manejar **DTOs personalizados**, y estandarizar las respuestas y errores de la aplicación.

Dentro del `src` se definió una carpeta **common**, donde se encuentra el `database.service`, encargado de manejar la conexión a **PostgreSQL** utilizando la librería **pg**, tal como se solicitó en el test técnico.

En la carpeta **config** se definió un `index.ts` para utilizar un barrel import, junto con el archivo `envs.ts`, responsable de manejar las variables de entorno.  
Para esto no utilicé un service interno de Nest, sino la librería **Joi + Dotenv**, con la que definí el esquema de variables obligatorias:

- NODE_ENV (development, production, test, provision)
- PORT (por defecto 3000)
- DATABASE_URL (conexión URL a PostgreSQL)

Estas validaciones se ejecutan automáticamente al iniciar la aplicación.

En el `main.ts` dejé configurado:

- `useGlobalPipes` con `ValidationPipe` para validar todos los DTOs
- configuración de **CORS**
- uso de `envs.port` proveniente del esquema Joi definido previamente

---

## Módulos y arquitectura

Dentro de la carpeta **modules** se definieron los dos módulos principales requeridos:

---

### Category Module

El módulo de `category` incluye:

- **DTOs**  
  - `create-category.dto.ts` para crear nuevas categorías

- **Entity**  
  - `category.entity.ts`, reflejando la estructura real de la base de datos

- **Controller**  
  - Endpoints para crear y listar categorías

- **Service**  
  - Lógica de negocio, validaciones internas y manejo de errores (`400` y `404`)

Se utilizó **Jest** para probar el `category.service`, especialmente porque durante el desarrollo surgieron errores que preferí depurar mediante testing interno en vez de Postman. (Igual use postman para la documentación)

---

### Product Module

En `product` se siguió la misma estructura:

- **DTOs**  
  - `create-product.dto.ts`
  - `update-product.dto.ts`

- **Entity**  
  - `product.entity.ts` representando el producto en PostgreSQL

- **Controller**  
  - `POST` crear producto  
  - `GET` obtener todos  
  - `PUT` actualizar parcialmente por ID  
  - `DELETE` eliminar producto

- **Service**  
  Aquí se implementaron:
  - validaciones al crear
  - retorno tipado de los productos
  - manejo de casos sin resultados (informando al cliente)
  - actualización parcial de campos
  - manejo de errores `404` al no existir registros o cuando se quiere asignar un id de categoria que no existe

Además, se utilizó **Jest** para pruebas del módulo de productos.

Dentro del service dejé un método privado `mapProduct`, que recibe un `row` proveniente de la librería `pg` y retorna un objeto de producto tipado. Esto mejora la estructura al trabajar con los arrays que devuelve `pg`.

---

## Estructura completa del proyecto

La estructura está documentada en el archivo **estructura.md** incluido dentro del repositorio.

---

## Mejoras que le aplicaría al proyecto en backend

- Método para obtener un producto por su ID  
- Método para actualizar una categoría  
- Método para eliminar una categoría  
- Documentación con Swagger  
- Prisma o TypeORM para manejo de consultas a la base de datos  
- Método de creación masiva de productos o categorías  
- Quizás websockets en caso que sean modulos con mucha interacción por parte de los usuarios para actualizar el front en tiempo real cuando se cree o modifique un producto.