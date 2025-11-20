# Proyecto Fullstack – HF Solutions Technical Test  
**NestJS + Express (Backend) + React + Vite (Frontend) + PostgreSQL + Docker**

Este repositorio contiene el desarrollo completo del test técnico solicitado, compuesto por un **backend construido en NestJS + Express_plataform**, un **frontend desarrollado en React con Vite**, y una **base de datos PostgreSQL contenida en Docker**.  

El objetivo fue estructurar un proyecto modular, claro y fácil de desplegar, dejando toda la arquitectura documentada y funcional.

---

## Estructura General del Repositorio

El repositorio está dividido en tres partes principales:

### **1. backend/**
Contiene toda la API desarrollada con **NestJS**.  
Dentro de esta carpeta existe un **README propio**, en donde explico:

- Qué librerías utilicé  
- Por qué opté por NestJS en lugar de Node + Express  
- Cómo está construida la arquitectura interna (módulos, servicios, DTOs, validaciones, etc.)  
- Cómo funcionan las validaciones de entorno, la conexión a PostgreSQL y el uso de Class Validator  
- Cómo se estructuran los tests con Jest  

Además del README, también existe un archivo **arquitectura.md**, donde se visualiza toda la arquitectura del backend.

---

### **2. frontend/**
Aquí se encuentra el frontend desarrollado con:

- **React**  
- **Vite** como empaquetador (por velocidad y simplicidad)  
- Componentes generados con **Shadcn UI (Chat100)**  
- Formularios con **React Hook Form + Zod**  
- Consumo de API con **Axios**  
- Estructura modular por dominio

Dentro de esta carpeta también existe su propio **README.md**, donde explico:

- Por qué se eligió React y no Next.js  
- Qué librerías se utilizaron  
- Cómo funciona la estructura interna   
- La estructura completa en un archivo **estructura.md**

---

### **3. docs/**
En esta carpeta se centraliza toda la evidencia del proyecto.

Contiene 3 carpetas principales:

#### **📁 backend-images/**
Imágenes de Postman testeando la API del backend.

#### **📁 deploy-images/**
Capturas del despliegue en Docker, incluyendo:

- Contenedores levantados  
- Docker Desktop mostrando el estado de ejecución  
- Evidencias del proceso de despliegue

#### **📁 front-images/**
Capturas del frontend ejecutándose correctamente ya dentro del contenedor.

---

## Base de Datos – Docker + PostgreSQL

La base de datos se encuentra dentro de la carpeta **database/** y está compuesta por:

- Un archivo **docker-compose.yml**, encargado de levantar PostgreSQL en un contenedor con su volumen correspondiente.
- Un script **01-init.sql**, el cual inicializa automáticamente:
  - La base de datos  
  - Las tablas  
  - La información necesaria para comenzar a utilizar la aplicación  

Este archivo se ejecuta cuando el contenedor se levanta por primera vez.

Actualmente, las variables de entorno fueron dejadas de forma explícita para facilitar el despliegue del test.  

Para un proyecto en producción, lo ideal sería reemplazarlas con un `.env` totalmente personalizable.

---

### **Infraestructura**
- Docker  
- Docker Compose  
- PostgreSQL con volumen persistente  
- Scripts SQL de inicialización  

---

## Documentación por proyecto

- **backend/README.md** → librerías, decisiones técnicas y arquitectura  
- **backend/arquitectura.md** → esquema completo del backend  
- **frontend/README.md** → librerías, decisiones técnicas y estructura  
- **frontend/estructura.md** → estructura detallada del frontend  
- **docs/** → evidencia visual del funcionamiento  

