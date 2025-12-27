# SKG Client - Pet Clinic Management System

## Project Overview

This is a comprehensive frontend application for the SKG Pet Clinic Management System, built with **Next.js 16**. It provides a robust interface for managing various clinic operations including appointments, inventory, billing, pharmacy, and patient records.

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: 
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Features

The application is structured into several core modules:

- **Authentication**: Secure login/logout functionality.
- **Dashboard**: Central hub for clinic metrics and quick actions.
- **Appointments**: Scheduling and managing doctor appointments.
- **Inventory**: Management of medical supplies and products.
- **Billing**: Invoicing and payment processing.
- **Medical**: Patient records and medical history.
- **Doctor Management**: Tools for doctors to manage their schedule and patients.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (LTS recommended).
- **Package Manager**: npm, yarn, pnpm, or bun.

### Environment Variables

Create a `.env` file in the root directory. You can use the example below:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000 # Replace with your backend API URL
```

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Application

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash
client/
├── app/                  # Next.js App Router pages and layouts
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── Redux/            # Redux store and slices
│   └── api/              # API utilities
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives
│   ├── forms/            # Form components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
└── ...
```

## Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Starts the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
