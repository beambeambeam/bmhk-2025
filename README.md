# Bangmod Hackathon 2025 Register Website

A monorepo containing the registration website for Bangmod Hackathon 2025, built with Next.js, Express.js, and PostgreSQL.

## 🚀 Development Environment Setup

### Prerequisites

Before setting up the development environment, make sure you have the following installed:

- **Node.js** (>= 20.0.0)
- **pnpm** (>= 10.14.0) - Package manager
- **Docker** and **Docker Compose** - For database and services
- **Git** - Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bmhk-2025
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database Configuration
   DATABASE_USER=postgres
   DATABASE_PW=password
   DATABASE_NAME=bmhk_2025
   DATABASE_URL=postgresql://postgres:password@localhost:5432/bmhk_2025

   # Add other environment variables as needed for your specific setup
   ```

4. **Start the database**

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

5. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```

### Available Scripts

- **Development**

  ```bash
  pnpm dev          # Start all services in development mode
  ```

- **Database**

  ```bash
  pnpm db:check     # Check database schema
  pnpm db:generate  # Generate database schema
  pnpm db:migrate   # Run database migrations
  ```

- **Code Quality**

  ```bash
  pnpm lint         # Run linting across all packages
  pnpm lint:fix     # Fix linting issues
  pnpm format       # Format code with Prettier
  ```

- **Build**
  ```bash
  pnpm build        # Build all packages and applications
  ```

### Project Structure

```
bmhk-2025/
├── apps/
│   ├── api/        # Express.js API server
│   └── web/        # Next.js web application
├── packages/
│   ├── auth/       # Authentication utilities
│   ├── db/         # Database schema and migrations
│   ├── ui/         # Shared UI components
│   └── ...         # Other shared packages
└── docker-compose.dev.yml  # Development services
```

### Development Workflow

1. Start the development environment:

   ```bash
   pnpm dev
   ```

2. The following services will be available:
   - **Web App**: http://localhost:3000
   - **API Server**: http://localhost:3001
   - **Database**: localhost:5432

3. Make changes to the code and see them reflected in real-time thanks to hot reloading.

### Troubleshooting

- **Database connection issues**: Make sure Docker is running and the database container is healthy
- **Port conflicts**: Check if ports 3000, 3001, or 5432 are already in use
- **Dependency issues**: Try running `pnpm install` again or clear the cache with `pnpm store prune`

### Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run linting and formatting: `pnpm lint && pnpm format`
4. Submit a pull request

For more detailed information about each package, check the individual README files in the `apps/` and `packages/` directories.
