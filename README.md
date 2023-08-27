# Local development
 
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# File Structure Design

## 1. Folder Structure

- src/
  - app/
  - components/
  - hooks/
  - providers/
  - services/
  - styles/
  - utils/

### App folder

The `app` directory is where you store files representing different routes and pages in your application. More information: https://nextjs.org/docs/getting-started/project-structure


### Components folder

The `components` folder is the home for reusable UI components that are used across multiple pages or sections of your application. Each component should have its own folder containing the component file(s) and any associated styles or assets.

### Hooks folder

The `hooks` folder is useful to store custom hooks in the project. You can encapsulate common logic and easily reuse it throughout your application.


### Providers folder

The `providers` folder is suitable for storing files that act as providers for client-side data or services. These providers can wrap your application or specific components, allowing them to access and provide data or functionality to the client-side code.

### Services folder

The `services` is designed to define modules that interact with external services, such as REST APIs, databases, or other data sources. Keeping this logic separate makes it easier to manage requests and responses from external services.


###  Styles folder
In the `styles` folder, you can find files related to styling the application. It may contain CSS, SASS, LESS files, depending on the project's preferences and needs.

###  Utils folder

The `utils` folder is used for utility functions, helper modules or constants that provide common functionality used throughout your application. These can include functions for data manipulation, formatting, or other reusable logic.


---

## 2. **Index.ts for Exporting**

The `index.ts` files within each folder play a significant role in simplifying the import process for components and utilities. These files export modules from their respective folders, allowing for cleaner and more concise imports in other parts of the project.

- MainFolder/
  - ComponentA/
    - index.ts
    - ComponentA.tsx
  - Utilities/
    - index.ts
    - UtilityA.ts
    - UtilityB.ts

Inside each index.js file, you can export the relevant components, functions, or modules from that folder as follows:

```
// ComponentA/index.ts
export * from './ComponentA';
export * from './ComponentA.css';

// Utilities/index.ts
export * from './UtilityA';
export * from './UtilityB';
```

Utilizing the index.ts files for exporting not only enhances code organization but also improves the maintainability and readability of your project.