# Admin User Panel

This project is an admin user panel built with React, utilizing React Router for navigation, Redux Toolkit (RTK) for state management, and RTK Query for API interactions. It includes authentication middleware and layouts for both dashboard and authentication pages.

## Features

- **Authentication**: User login and registration forms with state management.
- **Dashboard**: Admin panel with a structured layout for managing user data and other administrative tasks.
- **Routing**: Defined routes for authentication and dashboard pages using React Router.
- **State Management**: Utilizes Redux Toolkit for managing application state and RTK Query for API calls.

## Project Structure

```
admin-user-panel
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── AuthLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── features
│   │   ├── auth
│   │   │   ├── authSlice.ts
│   │   │   └── authMiddleware.ts
│   │   └── api
│   │       ├── apiSlice.ts
│   │       └── queryHooks.ts
│   ├── pages
│   │   ├── AuthPage.tsx
│   │   └── DashboardPage.tsx
│   ├── routes
│   │   └── AppRoutes.tsx
│   ├── store
│   │   └── store.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── global.css
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd admin-user-panel
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Technologies Used

- React
- Redux Toolkit
- RTK Query
- React Router
- TypeScript

## Contributing

Feel free to submit issues or pull requests to improve the project.