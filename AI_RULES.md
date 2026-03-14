# AI Development Rules - NCMP Uganda Backend

## Tech Stack
- **Runtime**: Node.js (v20.x)
- **Framework**: Express.js with ES Modules (`import`/`export`)
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Real-time**: Socket.io for messaging and signaling
- **Notifications**: Firebase Admin SDK (FCM)
- **Middleware**: Express-rate-limit for security, Morgan for logging
- **Environment**: dotenv for configuration management

## Development Rules

### 1. Architecture & Structure
- **MVC Pattern**: Follow the existing structure: `models/` for schemas, `controllers/` for logic, `routes/` for endpoints, and `middlewares/` for request processing.
- **ES Modules**: Always use `import/export` syntax. Never use `require`.
- **File Naming**: Use camelCase for controllers and middlewares (e.g., `auth.controller.js`). Use PascalCase for Models (e.g., `User.js`).

### 2. Database & Models
- **Sequelize**: Use Sequelize for all database interactions. Do not use raw SQL unless absolutely necessary for performance.
- **Associations**: Define model associations in a central place or within the model files to ensure `include` queries work correctly.
- **Naming**: Database tables use `snake_case`, while JavaScript objects use `camelCase`.

### 3. Authentication & Security
- **Protected Routes**: Use `authMiddleware` for any route requiring a logged-in user.
- **RBAC**: Use `roleMiddleware(["Admin", "MP", "Citizen"])` to restrict access based on user roles.
- **Validation**: Always validate `req.body` using the `validateRequest` middleware before processing logic in controllers.

### 4. Real-time & Notifications
- **Socket.io**: Use the `utils/socket.js` singleton to access the `io` instance. Do not re-initialize the server.
- **Push Notifications**: Use the `sendNotification` utility from `config/firebase.js` for mobile/web push alerts.

### 5. Error Handling & Responses
- **Try/Catch**: Wrap controller logic in try/catch blocks.
- **Consistent JSON**: Always return consistent response objects:
  - Success: `{ success: true, data: ... }` or just the data object for list endpoints.
  - Error: `{ success: false, message: "Error description" }` with appropriate HTTP status codes (400, 401, 403, 404, 500).

### 6. Code Style
- **Clean Code**: Keep controllers focused. Move complex business logic to service files if they exceed 100 lines.
- **Logging**: Use `morgan` for request logging and the custom `utils/logger.js` for application-level logs.