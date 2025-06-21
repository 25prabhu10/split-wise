# Split Wise

A simple tool to split expenses with friends.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [TanStack Start](https://tanstack.com/start/latest) - Full-stack React framework
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 23.0.0
- **pnpm** >= 10.12.1
- **PostgreSQL** database

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd split-wise
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials and other configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/splitwisedb"

# Auth (generate secure random strings)
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Add other environment variables as needed
```

### 4. Database Setup

Run the database migrations:

```bash
pnpm db:push

# or if you have a migrate script
pnpm db:migrate
```

### 5. Start the development server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🔧 Development

### Code Quality

This project uses several tools to maintain code quality:

- **ESLint** - For code linting and best practices
- **Prettier** - For consistent code formatting
- **TypeScript** - For type safety
- **Simple git hooks & Lint staged** - For pre-commit hooks

### Database Changes

When making database schema changes:

1. Update your schema files in `src/db/`
2. Generate migrations: `pnpm db:generate`
3. Apply migrations: `pnpm db:push`
