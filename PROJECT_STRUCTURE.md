# Project Structure

This document outlines the organization of the Saskia Cosméticos project.

## Directory Structure

```
src/
├── app/
│   ├── features/           # Domain-specific features
│   │   ├── cabelos/        # Hair products feature
│   │   ├── corpo/          # Body products feature
│   │   ├── maquiagem/      # Makeup products feature
│   │   ├── perfumes/       # Perfume products feature
│   │   ├── skincare/       # Skincare products feature
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── data/               # Data sources and mock data
│   ├── hooks/              # Custom React hooks
│   ├── interfaces/         # TypeScript interfaces and types
│   ├── services/           # Business logic and API services
│   ├── styles/             # Global styles and theme definitions
│   │   ├── animations.css  # Animation utilities
│   │   ├── index.css       # Main stylesheet that imports all others
│   │   ├── responsive.css  # Responsive design utilities
│   │   ├── theme.css       # Theme variables and common styles
│   ├── utils/              # Utility functions and helpers
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx          # Root layout component
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Home page
```

## Layer Responsibilities

### Features

The `features/` directory contains domain-specific components and pages. Each feature is organized in its own directory and represents a specific business domain or user flow.

### Components

The `components/` directory contains reusable UI components that are used across multiple features. These components should be generic and not contain business logic specific to a feature.

### Context

The `context/` directory contains React context providers that manage global state across the application.

### Data

The `data/` directory contains data sources, mock data, and data models.

### Hooks

The `hooks/` directory contains custom React hooks that encapsulate reusable stateful logic.

### Interfaces

The `interfaces/` directory contains TypeScript interfaces and types used throughout the application.

### Services

The `services/` directory contains business logic and API services. These services handle data fetching, processing, and other business operations.

### Styles

The `styles/` directory contains CSS files for styling the application:
- `animations.css`: Contains reusable animation keyframes and classes
- `index.css`: Main stylesheet that imports all other style files
- `responsive.css`: Contains responsive design utilities and media queries
- `theme.css`: Contains color variables, spacing, and other theme definitions

### Utils

The `utils/` directory contains utility functions and helpers that are used across the application.

## Best Practices

1. **Feature-first organization**: Group code by feature rather than by type.
2. **Separation of concerns**: Keep UI components separate from business logic.
3. **Reusable components**: Create generic components that can be reused across features.
4. **Custom hooks**: Extract stateful logic into custom hooks for reuse.
5. **Type safety**: Use TypeScript interfaces to ensure type safety across the application.
6. **Consistent styling**: Use the theme variables defined in styles/theme.css for consistent colors and spacing. 