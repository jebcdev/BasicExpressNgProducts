# 🚀 BasicExpressNgProducts

**Sistema completo de gestión de productos** desarrollado con **Express.js + TypeScript** (Backend) y **Angular 19** (Frontend), utilizando **PostgreSQL** como base de datos y **TypeORM** para el manejo de entidades.

## 📋 Tabla de Contenidos

-   [🎯 Descripción General](#-descripción-general)
-   [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
-   [🔧 Tecnologías Utilizadas](#-tecnologías-utilizadas)
-   [📂 Estructura del Proyecto](#-estructura-del-proyecto)
-   [⚡ Instalación y Configuración](#-instalación-y-configuración)
-   [🗄️ Base de Datos](#️-base-de-datos)
-   [🔐 Autenticación y Autorización](#-autenticación-y-autorización)
-   [📡 API Endpoints](#-api-endpoints)
-   [🎨 Frontend - Angular 19](#-frontend---angular-19)
-   [🛠️ Scripts Disponibles](#️-scripts-disponibles)
-   [📹 Tutorial en Video](#-tutorial-en-video)
-   [🤝 Contribuir](#-contribuir)
-   [📄 Licencia](#-licencia)

---

## 🎯 Descripción General

**BasicExpressNgProducts** es un sistema completo de gestión de productos que incluye:

-   ✅ **Sistema de autenticación JWT** con roles (Admin/User)
-   ✅ **CRUD completo** para productos, categorías, marcas, usuarios y roles
-   ✅ **Upload de imágenes** con middleware de multer
-   ✅ **Dashboard administrativo** con tablas interactivas
-   ✅ **API RESTful**
-   ✅ **Frontend responsive** con Angular 19 y TailwindCSS + DaisyUI
-   ✅ **Validaciones** tanto en backend como frontend
-   ✅ **Seeder** para datos de prueba
-   ✅ **Soft delete** en todas las entidades

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   Angular 19    │ ◄─────────────────► │   Express.js    │
│   Frontend      │     (Port 4200)     │   Backend       │
│                 │                     │   (Port 3000)   │
└─────────────────┘                     └─────────────────┘
                                                  │
                                                  │ TypeORM
                                                  ▼
                                        ┌─────────────────┐
                                        │   PostgreSQL    │
                                        │   Database      │
                                        │   (Port 5432)   │
                                        └─────────────────┘
```

### Características Arquitectónicas:

-   **Backend**: API REST con Express.js + TypeScript
-   **Frontend**: SPA con Angular 19 + Standalone Components
-   **Base de Datos**: PostgreSQL con TypeORM
-   **Autenticación**: JWT con middleware personalizado
-   **Validación**: Class-validator en backend, Angular Forms en frontend
-   **File Upload**: Multer para manejo de imágenes
-   **Styling**: TailwindCSS + DaisyUI + TanStack Table

---

## 🔧 Tecnologías Utilizadas

### 🔙 Backend (Express.js + TypeScript)

| Tecnología            | Versión     | Propósito                     |
| --------------------- | ----------- | ----------------------------- |
| **Node.js**           | 18+         | Runtime de JavaScript         |
| **Express.js**        | ^4.21.2     | Framework web                 |
| **TypeScript**        | Latest      | Tipado estático               |
| **TypeORM**           | ^0.3.20     | ORM para PostgreSQL           |
| **PostgreSQL**        | ^8.15.1     | Base de datos                 |
| **JWT**               | 9.0.2       | Autenticación                 |
| **Bcryptjs**          | ^2.4.3      | Hash de contraseñas           |
| **Multer**            | 1.4.5-lts.2 | Upload de archivos            |
| **Class-validator**   | 0.14.1      | Validación de DTOs            |
| **Class-transformer** | 0.5.1       | Transformación de objetos     |
| **Helmet**            | ^8.0.0      | Seguridad HTTP                |
| **CORS**              | ^2.8.5      | Cross-Origin Resource Sharing |
| **Morgan**            | 1.10.0      | HTTP request logger           |
| **dotenv**            | ^16.4.7     | Variables de entorno          |

### 🎨 Frontend (Angular 19)

| Tecnología         | Versión | Propósito             |
| ------------------ | ------- | --------------------- |
| **Angular**        | ^19.2.0 | Framework frontend    |
| **TypeScript**     | Latest  | Tipado estático       |
| **TailwindCSS**    | ^4.1.4  | Framework CSS         |
| **DaisyUI**        | Latest  | Componentes UI        |
| **TanStack Table** | ^8.21.3 | Tablas interactivas   |
| **ngx-sonner**     | ^3.1.0  | Notificaciones toast  |
| **RxJS**           | ~7.8.0  | Programación reactiva |

---

## 📂 Estructura del Proyecto

```
BasicExpressNgProducts/
├── 📁 backend/                    # API Express.js + TypeScript
│   ├── 📄 package.json           # Dependencias del backend
│   ├── 📄 tsconfig.json          # Configuración TypeScript
│   ├── 📄 .env                   # Variables de entorno
│   └── 📁 src/
│       ├── 📄 app.ts             # Punto de entrada
│       ├── 📄 server.ts          # Configuración del servidor
│       ├── 📁 core/              # Configuraciones centrales
│       │   ├── 📁 config/        # Configuración de DB
│       │   └── 📁 middlewares/   # Middlewares personalizados
│       ├── 📁 modules/           # Módulos de la aplicación
│       │   ├── 📁 auth/          # Autenticación (login/register)
│       │   ├── 📁 user/          # Gestión de usuarios
│       │   ├── 📁 role/          # Gestión de roles
│       │   ├── 📁 dashboard/     # Módulos del dashboard
│       │   │   ├── 📁 products/  # Gestión de productos
│       │   │   ├── 📁 categories/# Gestión de categorías
│       │   │   └── 📁 brands/    # Gestión de marcas
│       │   ├── 📁 database/      # Conexión a la base de datos
│       │   └── 📁 seeder/        # Seeders para datos de prueba
│       └── 📁 utils/             # Utilidades (bcrypt, jwt, etc.)
│
├── 📁 frontend/                   # Aplicación Angular 19
│   ├── 📄 package.json           # Dependencias del frontend
│   ├── 📄 angular.json           # Configuración Angular
│   ├── 📄 tsconfig.json          # Configuración TypeScript
│   ├── 📄 tailwind.config.js     # Configuración TailwindCSS
│   └── 📁 src/
│       ├── 📄 main.ts            # Bootstrap de la aplicación
│       ├── 📄 styles.css         # Estilos globales
│       └── 📁 app/
│           ├── 📄 app.component.ts    # Componente raíz
│           ├── 📄 app.config.ts       # Configuración de la app
│           ├── 📄 app.routes.ts       # Rutas principales
│           ├── 📁 admin/              # Panel de administración
│           │   ├── 📁 pages/          # Páginas del admin
│           │   ├── 📁 services/       # Servicios HTTP
│           │   ├── 📁 interfaces/     # Interfaces TypeScript
│           │   └── 📁 routes/         # Rutas del admin
│           ├── 📁 auth/               # Módulo de autenticación
│           ├── 📁 front/              # Frontend público
│           ├── 📁 private/            # Área privada de usuarios
│           └── 📁 shared/             # Componentes compartidos
│
├── 📄 README.md                  # Este archivo
├── 📄 LICENSE                   # Licencia del proyecto
└── 📄 PRODUCTS_DETAILS_IMPLEMENTATION.md  # Documentación específica
```

---

## ⚡ Instalación y Configuración

### 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

-   **Node.js** (versión 18 o superior)
-   **npm** o **yarn**
-   **PostgreSQL** (versión 12 o superior)
-   **Git**

### 🔽 1. Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/jebcdev/BasicExpressNgProducts.git

# Navegar al directorio del proyecto
cd BasicExpressNgProducts
```

### 🔧 2. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env  # Si no existe, crear .env manualmente
```

#### 📝 Configurar Variables de Entorno (`.env`)

```bash
# API Configuration
API_PREFIX="/api/v1"
PORT=3000

# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=basic-express-ng-products

# Security
BCRYPT_SALT=10
JWT_SECRET="aVerySecretString"
```

#### 🗄️ Configurar Base de Datos

```bash
# Conectar a PostgreSQL (como superusuario)
psql -U postgres

# Crear la base de datos
CREATE DATABASE "basic-express-ng-products";

# Crear usuario (opcional)
CREATE USER ng_products_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE "basic-express-ng-products" TO ng_products_user;

# Salir de psql
\q
```

#### 🚀 Ejecutar el Backend

```bash
# Compilar TypeScript
npm run build

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar en producción
npm start
```

### 🎨 3. Configuración del Frontend

```bash
# En una nueva terminal, navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar con ng serve
npm start
```

#### 🌐 URLs de Acceso

-   **Frontend**: [http://localhost:4200](http://localhost:4200)
-   **Backend API**: [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

### 📊 4. Poblar la Base de Datos (Seeder)

```bash
# Con el backend corriendo, ejecutar los seeders usando Postman o curl:

# Seedear roles y usuarios
curl -X POST http://localhost:3000/api/v1/seeder/rolesusers

# Seedear categorías
curl -X POST http://localhost:3000/api/v1/seeder/categories

# Seedear marcas
curl -X POST http://localhost:3000/api/v1/seeder/brands

# Seedear productos
curl -X POST http://localhost:3000/api/v1/seeder/products
```

---

## 🗄️ Base de Datos

### 📊 Esquema de la Base de Datos

El sistema utiliza **PostgreSQL** con las siguientes entidades principales:

#### 👥 Entidad: `users`

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL,
    surname VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);
```

#### 🔐 Entidad: `roles`

```sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);
```

#### 📦 Entidad: `products`

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) UNIQUE NOT NULL,
    slug VARCHAR(180) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(255),
    images TEXT[],
    price NUMERIC(10,2) NOT NULL,
    sale_price NUMERIC(10,2),
    cost_price NUMERIC(10,2),
    stock_quantity INTEGER NOT NULL,
    sku VARCHAR(100),
    barcode VARCHAR(100),
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    category_id INTEGER NOT NULL,
    brand_id INTEGER NOT NULL,
    tags TEXT[],
    attributes TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);
```

#### 🏷️ Entidad: `categories`

```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);
```

#### 🏢 Entidad: `brands`

```sql
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
);
```

### 🔗 Relaciones

-   `users` ←→ `roles` (Many-to-One)
-   `products` ←→ `categories` (Many-to-One)
-   `products` ←→ `brands` (Many-to-One)

---

## 🔐 Autenticación y Autorización

### 🔑 Sistema de JWT

El sistema utiliza **JSON Web Tokens (JWT)** para la autenticación:

```typescript
// Middleware de verificación de token
TokenExistsMiddleware.check;

// Middleware de verificación de admin
IsAdminMiddleware.check;
```

### 👤 Roles del Sistema

| Rol       | Descripción               | Permisos                             |
| --------- | ------------------------- | ------------------------------------ |
| **Admin** | Administrador del sistema | CRUD completo en todas las entidades |
| **User**  | Usuario regular           | Solo lectura y gestión de perfil     |

### 🔒 Endpoints Protegidos

```typescript
// Rutas que requieren autenticación
/api/v1/auth/profile          // Token requerido
/api/v1/auth/update-profile   // Token requerido
/api/v1/auth/check-token      // Token requerido

// Rutas que requieren ser Admin
/api/v1/roles/*               // Token + Admin
/api/v1/users/*               // Token + Admin
/api/v1/dashboard/*           // Token + Admin
```

---

## 📡 API Endpoints

### 🔐 Autenticación (`/auth`)

| Método | Endpoint               | Descripción                 | Requiere Auth |
| ------ | ---------------------- | --------------------------- | ------------- |
| `POST` | `/auth/register`       | Registrar nuevo usuario     | ❌            |
| `POST` | `/auth/login`          | Iniciar sesión              | ❌            |
| `POST` | `/auth/profile`        | Obtener perfil del usuario  | ✅ Token      |
| `POST` | `/auth/update-profile` | Actualizar perfil           | ✅ Token      |
| `POST` | `/auth/check-token`    | Verificar validez del token | ✅ Token      |

### 👥 Usuarios (`/users`)

| Método   | Endpoint     | Descripción            | Requiere Auth |
| -------- | ------------ | ---------------------- | ------------- |
| `GET`    | `/users`     | Listar usuarios        | ✅ Admin      |
| `GET`    | `/users/:id` | Obtener usuario por ID | ✅ Admin      |
| `POST`   | `/users`     | Crear usuario          | ✅ Admin      |
| `PATCH`  | `/users/:id` | Actualizar usuario     | ✅ Admin      |
| `DELETE` | `/users/:id` | Eliminar usuario       | ✅ Admin      |

### 🔐 Roles (`/roles`)

| Método   | Endpoint     | Descripción        | Requiere Auth |
| -------- | ------------ | ------------------ | ------------- |
| `GET`    | `/roles`     | Listar roles       | ✅ Admin      |
| `GET`    | `/roles/:id` | Obtener rol por ID | ✅ Admin      |
| `POST`   | `/roles`     | Crear rol          | ✅ Admin      |
| `PATCH`  | `/roles/:id` | Actualizar rol     | ✅ Admin      |
| `DELETE` | `/roles/:id` | Eliminar rol       | ✅ Admin      |

### 📦 Productos (`/dashboard/products`)

| Método   | Endpoint                  | Descripción                   | Requiere Auth |
| -------- | ------------------------- | ----------------------------- | ------------- |
| `GET`    | `/dashboard/products`     | Listar productos              | ✅ Admin      |
| `GET`    | `/dashboard/products/:id` | Obtener producto por ID       | ✅ Admin      |
| `POST`   | `/dashboard/products`     | Crear producto (con imágenes) | ✅ Admin      |
| `PATCH`  | `/dashboard/products/:id` | Actualizar producto           | ✅ Admin      |
| `DELETE` | `/dashboard/products/:id` | Eliminar producto             | ✅ Admin      |

### 🏷️ Categorías (`/dashboard/categories`)

| Método   | Endpoint                           | Descripción                  | Requiere Auth |
| -------- | ---------------------------------- | ---------------------------- | ------------- |
| `GET`    | `/dashboard/categories`            | Listar categorías            | ✅ Admin      |
| `GET`    | `/dashboard/categories/:id`        | Obtener categoría por ID     | ✅ Admin      |
| `GET`    | `/dashboard/categories/slug/:slug` | Obtener por slug             | ✅ Admin      |
| `POST`   | `/dashboard/categories`            | Crear categoría (con imagen) | ✅ Admin      |
| `PATCH`  | `/dashboard/categories/:id`        | Actualizar categoría         | ✅ Admin      |
| `DELETE` | `/dashboard/categories/:id`        | Eliminar categoría           | ✅ Admin      |

### 🏢 Marcas (`/dashboard/brands`)

| Método   | Endpoint                       | Descripción              | Requiere Auth |
| -------- | ------------------------------ | ------------------------ | ------------- |
| `GET`    | `/dashboard/brands`            | Listar marcas            | ✅ Admin      |
| `GET`    | `/dashboard/brands/:id`        | Obtener marca por ID     | ✅ Admin      |
| `GET`    | `/dashboard/brands/slug/:slug` | Obtener por slug         | ✅ Admin      |
| `POST`   | `/dashboard/brands`            | Crear marca (con imagen) | ✅ Admin      |
| `PATCH`  | `/dashboard/brands/:id`        | Actualizar marca         | ✅ Admin      |
| `DELETE` | `/dashboard/brands/:id`        | Eliminar marca           | ✅ Admin      |

### 🌱 Seeder (`/seeder`)

| Método | Endpoint             | Descripción             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/seeder/rolesusers` | Poblar roles y usuarios |
| `POST` | `/seeder/categories` | Poblar categorías       |
| `POST` | `/seeder/brands`     | Poblar marcas           |
| `POST` | `/seeder/products`   | Poblar productos        |

---

## 🎨 Frontend - Angular 19

### 🏗️ Arquitectura del Frontend

El frontend está construido con **Angular 19** utilizando:

-   ✅ **Standalone Components** (sin módulos)
-   ✅ **Signals** para el manejo de estado
-   ✅ **Control Flow** (`@if`, `@for`, `@else`)
-   ✅ **rxResource** para peticiones HTTP reactivas
-   ✅ **Guards** para protección de rutas
-   ✅ **Interceptors** para manejo de tokens
-   ✅ **Path mapping** para imports limpios

### 🛣️ Estructura de Rutas

```typescript
// Rutas principales
app.routes.ts
├── /auth/*          → Módulo de autenticación
├── /admin/*         → Panel de administración (solo admins)
├── /private/*       → Área privada (usuarios autenticados)
├── /               → Frontend público
└── /**             → Página 404
```

#### 🔐 Rutas de Autenticación (`/auth`)

-   `/auth/login` - Página de inicio de sesión
-   `/auth/register` - Página de registro

#### 🔧 Rutas de Administración (`/admin`)

```
/admin/
├── /                    → Dashboard principal
├── /roles/              → Gestión de roles
│   ├── /                → Lista de roles
│   ├── /create          → Crear rol
│   └── /edit/:roleId    → Editar rol
├── /users/              → Gestión de usuarios
│   ├── /                → Lista de usuarios
│   ├── /create          → Crear usuario
│   └── /edit/:userId    → Editar usuario
├── /categories/         → Gestión de categorías
│   ├── /                → Lista de categorías
│   ├── /create          → Crear categoría
│   └── /edit/:categoryId → Editar categoría
├── /brands/             → Gestión de marcas
│   ├── /                → Lista de marcas
│   ├── /create          → Crear marca
│   └── /edit/:brandId   → Editar marca
└── /products/           → Gestión de productos
    ├── /                → Lista de productos
    ├── /create          → Crear producto
    ├── /edit/:productId → Editar producto
    └── /details/:productId → Ver detalles
```

### 🛡️ Guards y Protección de Rutas

```typescript
// Guards implementados
NotAuthenticatedGuard; // Solo para usuarios no autenticados
IsAuthenticatedGuard; // Solo para usuarios autenticados
IsAdminGuard; // Solo para administradores
```

### 🎯 Servicios HTTP

```typescript
// Servicios principales
AuthService; // Autenticación y perfil
RolesService; // Gestión de roles
UsersService; // Gestión de usuarios
CategoriesService; // Gestión de categorías
BrandsService; // Gestión de marcas
ProductsService; // Gestión de productos
```

### 🎨 Componentes UI

-   **TailwindCSS** para utilidades CSS
-   **DaisyUI** para componentes predefinidos
-   **TanStack Table** para tablas interactivas con:
    -   Paginación
    -   Filtrado
    -   Ordenamiento
    -   Acciones CRUD

### 📱 Características del Frontend

-   ✅ **Responsive Design** para mobile y desktop
-   ✅ **Loading States** con spinners
-   ✅ **Error Handling** con mensajes informativos
-   ✅ **Toast Notifications** con ngx-sonner
-   ✅ **Form Validation** en tiempo real
-   ✅ **Image Upload** con preview
-   ✅ **Dark/Light Mode** (DaisyUI)

---

## 🛠️ Scripts Disponibles

### 📦 Backend Scripts

```bash
# En /backend
npm run build      # Compilar TypeScript a JavaScript
npm run dev        # Ejecutar en modo desarrollo con watch
npm start          # Ejecutar en modo producción
```

### 🎨 Frontend Scripts

```bash
# En /frontend
npm run ng         # Comando ng
npm run dev        # Ejecutar en modo desarrollo (limpia .angular)
npm start          # Ejecutar con ng serve
npm run build      # Compilar para producción
npm run watch      # Compilar en modo desarrollo con watch
npm run lint       # Linter con ESLint
npm run format     # Formatear código con Prettier
```

## 🔧 Configuración Adicional

### 📁 Upload de Archivos

El sistema maneja upload de imágenes en:

```
backend/dist/public/uploads/
├── categories/    # Imágenes de categorías
├── brands/        # Imágenes de marcas
└── products/      # Imágenes de productos
```

### 🔒 Seguridad

-   **Helmet** para headers de seguridad
-   **CORS** configurado para desarrollo y producción
-   **Bcrypt** para hash de contraseñas (salt: 10)
-   **JWT** con expiración configurable
-   **Validación** de archivos y tamaños en uploads

### 🐛 Debugging

```bash
# Backend: Habilitar logs de SQL
# En database.config.ts: logging: true

# Frontend: Modo debug
ng serve --verbose
```

---

## 📹 Tutorial en Video

🎥 **Aprende paso a paso cómo construir este proyecto completo**

Este proyecto fue desarrollado como parte de una serie de tutoriales en YouTube donde se explica desde cero cómo crear un sistema completo de gestión de productos con tecnologías modernas.

**📺 Ver la playlist completa:**
👉 [BasicExpressNgProducts - Tutorial Completo](https://www.youtube.com/playlist?list=PLek3UYLkoPpyx0GZD85I5RwoPoJbqBpqP)

### 🎯 ¿Qué aprenderás en los videos?

-   **Backend con Express.js + TypeScript**

    -   Configuración inicial del proyecto
    -   Implementación de TypeORM con PostgreSQL
    -   Sistema de autenticación JWT
    -   Upload de archivos con Multer
    -   Middlewares personalizados y validaciones

-   **Frontend con Angular 19**

    -   Configuración de Angular con TailwindCSS + DaisyUI
    -   Implementación de Signals y Control Flow
    -   Gestión de estado con rxResource
    -   Formularios reactivos y validaciones
    -   Tablas interactivas con TanStack Table

-   **Integración Completa**
    -   Conexión Frontend-Backend
    -   Manejo de autenticación
    -   CRUD completo de entidades
    -   Deploy y configuración de producción

**💡 Ideal para:** Desarrolladores que quieren aprender tecnologías modernas de desarrollo full-stack

---

## 🤝 Contribuir

1. **Fork** el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** los cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un **Pull Request**

### 📋 Guidelines

-   Seguir los patrones de código existentes
-   Añadir tests para nuevas funcionalidades
-   Actualizar documentación según sea necesario
-   Usar commits descriptivos

---

## 🐛 Solución de Problemas

### ❌ Problemas Comunes

**Error de conexión a la base de datos:**

```bash
# Verificar que PostgreSQL esté corriendo
sudo service postgresql status

# Verificar las credenciales en .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

**Error de CORS en el frontend:**

```typescript
// Verificar en backend/src/server.ts
cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});
```

**Error en build de Angular:**

```bash
# Limpiar caché
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**JEBC-DeV**

-   🐙 GitHub: [@jebcdev](https://github.com/jebcdev)
-   📺 YouTube: [Tutorial Completo del Proyecto](https://www.youtube.com/playlist?list=PLek3UYLkoPpyx0GZD85I5RwoPoJbqBpqP)
-   📧 Email: [jebcdev@gmail.com]

---

## 🙏 Agradecimientos

-   **Angular Team** por Angular 19
-   **Express.js** por el framework backend
-   **TypeORM** por el excelente ORM
-   **TailwindCSS** y **DaisyUI** por los estilos
-   **TanStack** por las tablas interactivas

---

## 🔄 Versiones

| Versión    | Fecha   | Cambios                                 |
| ---------- | ------- | --------------------------------------- |
| **v1.0.0** | 2024-01 | Versión inicial con CRUD completo       |
| **v1.1.0** | 2024-02 | Implementación de detalles de productos |
| **v1.2.0** | 2024-03 | Mejoras en UI/UX                        |

---

**⭐ Si este proyecto te ha sido útil:**

-   🌟 **Dale una estrella en GitHub**
-   📺 **Suscríbete al canal y ve el tutorial completo**: [Ver Videos](https://www.youtube.com/playlist?list=PLek3UYLkoPpyx0GZD85I5RwoPoJbqBpqP)
-   🔔 **Activa las notificaciones** para no perderte nuevos tutoriales

**¡Tu apoyo ayuda a crear más contenido educativo! 🚀**
