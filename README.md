📦 **Rick & Morty Character Explorer**

Una SPA (Single Page Application) moderna construida con **React 18**, **Redux Toolkit**, **GraphQL (Apollo Client)**, **React Router**, **TailwindCSS** y **TypeScript**. Consume la [API pública de Rick and Morty](https://rickandmortyapi.com/graphql) para mostrar, filtrar, ordenar, comentar y marcar personajes como favoritos.

---

## ✅ Checklist de requisitos cumplidos - Prueba Técnica Rick & Morty App

| Categoría                            | Requisito                                               | Estado      |
| ------------------------------------ | ------------------------------------------------------- | ----------- |
| **🛠 Tecnologías base**               | Uso de React 18, GraphQL, React Router DOM              | ✅ Cumplido |
|                                      | Uso de TailwindCSS, Redux Toolkit, TypeScript           | ✅ Cumplido |
| **🧩 Funcionalidad básica**          | Listar personajes con nombre, imagen y especie          | ✅ Cumplido |
|                                      | Vista de detalle del personaje al hacer clic            | ✅ Cumplido |
|                                      | Marcar personajes como favoritos                        | ✅ Cumplido |
|                                      | Ordenar personajes por nombre (A-Z / Z-A)               | ✅ Cumplido |
|                                      | Buscar personajes por texto                             | ✅ Cumplido |
|                                      | Agregar comentarios a los personajes                    | ✅ Cumplido |
| **📱 UI/UX**                         | Diseño responsive usando Flexbox y CSS Grid             | ✅ Cumplido |
|                                      | Interfaz visual atractiva y de alta usabilidad          | ✅ Cumplido |
| **✨ Requisitos opcionales (bonus)** | Soft-delete (ocultar personajes sin eliminarlos)        | ✅ Cumplido |
|                                      | Filtros por `Status`, `Species` y `Gender`              | ✅ Cumplido |
|                                      | Uso de TypeScript en toda la app                        | ✅ Cumplido |
|                                      | Pruebas unitarias en al menos 3 componentes             | ✅ Cumplido |
| **📦 Entregables**                   | Repositorio público en GitHub                           | ✅ Cumplido |
|                                      | README con instrucciones completas de instalación y uso | ✅ Cumplido |

## 🚀 Instalación y ejecución local

1. **Clona el repositorio:**

```bash
git clone https://github.com/oibotero/blossom-rick-morty-app.git
cd rick-morty-app
```

2. **Instala las dependencias:**

```bash
npm install
```

> 💡 Si encuentras errores con dependencias, puedes forzar la instalación con:

```bash
npm install --legacy-peer-deps
```

3. **Inicia la app en modo desarrollo:**

```bash
npm run dev
```

> 🔄 Para exponer en red local (por ejemplo, para dispositivos móviles):

```bash
npx vite --host 0.0.0.0
```

4. **Vista previa del build de producción:**

```bash
npm run preview
```

5. **Compila para producción:**

```bash
npm run build
```

---

## 🧪 Pruebas unitarias con Vitest

Este proyecto utiliza **Vitest** junto con **@testing-library/react** para testear componentes de forma aislada.

### Ejecutar todas las pruebas:

```bash
npm run test
```

### Componentes testeados:

- `FavoritesComponent`
- `CommentComponent`
- `CharacterCard`

> 🧪 Las pruebas se encuentran en `src/test/`

---

## 📡 Consumo de API GraphQL

Esta app consume la [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) utilizando Apollo Client.

### ¿Por qué GraphQL?

- Permite obtener únicamente los datos necesarios.
- Facilita la integración con Apollo Client y React.
- Mejora el rendimiento en comparación con REST al evitar overfetching.

### Organización del código:

- Las queries GraphQL están organizadas en `/src/graphql/queries.ts`.
- Los hooks personalizados usan `useQuery` de Apollo para consumir los datos.

---

## 🧰 Scripts disponibles

| Comando           | Descripción                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Inicia servidor en modo desarrollo  |
| `npm run build`   | Compila la app para producción      |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint`    | Ejecuta ESLint                      |
| `npm run test`    | Ejecuta pruebas con Vitest          |

---

## 📦 Dependencias principales

### Frameworks y librerías

- **react**, **react-dom**: Core de React
- **react-router-dom**: Enrutamiento
- **@apollo/client**, **graphql**: Consumo de GraphQL
- **@reduxjs/toolkit**, **react-redux**: Manejo de estado global
- **tailwindcss**: Utilidad para estilos CSS
- **framer-motion**: Animaciones
- **lucide-react**: Iconos modernos

### Pruebas

- **vitest**, **@vitest/ui**, **@vitest/coverage-v8**: Testing framework y UI
- **@testing-library/react**, **user-event**, **jest-dom**: Utilidades para pruebas
- **jsdom**: Simulación de DOM en entorno Node

### Linter y herramientas

- **eslint**, **eslint-plugin-react-hooks**, **typescript**, **vite**

---

## 🧼 Estructura recomendada

```
├── public
├── src
│   ├── components
│   ├── graphql
│   ├── hooks
│   ├── pages
│   ├── store
│   └── test
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 📋 Consideraciones adicionales

- El proyecto está tipado completamente con **TypeScript**.
- Toda la lógica de estado global se maneja con **Redux Toolkit**.
- La UI es completamente **responsiva y optimizada para dispositivos móviles**.
- El diseño se adapta a distintos tamaños de pantalla con **TailwindCSS**.
- Se utilizaron **buenas prácticas de accesibilidad** (etiquetas, navegación por teclado, etc.).

---

🎯 ¡Gracias por revisar este proyecto! Si tienes alguna duda o sugerencia, no dudes en abrir un issue o contribuir ✨
