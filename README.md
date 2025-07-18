# ByteChat: Real-time Chat Application (Backend)

A modern, real-time chat application built with React, TypeScript, and Node.js, featuring WebSocket support for instant messaging. The application provides a seamless chat experience with real-time message delivery, user authentication, and responsive design.

Visit the frontend repository [here](https://github.com/iamayan2011/bytechat-frontend).
<img width="1909" height="876" alt="image" src="https://github.com/user-attachments/assets/0f3da116-48d2-483e-b95b-e15f542b530b" />
<img width="1311" height="824" alt="image" src="https://github.com/user-attachments/assets/8621694c-a526-41cb-a656-b79d323f91fd" />
<img width="1916" height="866" alt="image" src="https://github.com/user-attachments/assets/bba4a84c-dd93-4b93-94c5-32ddb9c7507c" />

## Features

### Core Features
- Real-time messaging with WebSockets
- JWT-based user authentication
- Responsive design with 32 daisyUI themes including dark/light mode
- File/image sharing with Cloudinary integration
- Online/offline status indicators
- Message read receipts
- Clean and intuitive user interface

### Technical Features
- Type-safe development with TypeScript
- State management with Zustand
- Form validation with Joi (backend) and React Hook Form (frontend)
- Real-time updates with Socket.IO
- Responsive design with Tailwind CSS and daisyUI
- Toast notifications for user feedback
- Protected routes and API endpoints

## Tech Stack

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with DaisyUI
- **State Management**: Zustand
- **Real-time**: Socket.IO Client
- **Build Tool**: Vite
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT
- **Real-time**: Socket.IO
- **File Storage**: Cloudinary
- **Input Validation**: Joi
- **Security**: bcryptjs for password hashing
- **Environment Management**: dotenv

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
  - Required fields: `name`, `email`, `password`
  - Returns: User object and JWT token

- `POST /api/auth/login` - Authenticate user
  - Required fields: `email`, `password`
  - Returns: User object and JWT token

- `POST /api/auth/logout` - Logout user
  - Clears authentication cookies
  - No request body required

- `PUT /api/auth/update-profile` - Update user profile
  - Requires authentication
  - Accepts: `profilePic` (image file)
  - Returns: Updated user object

- `GET /api/auth/check-auth` - Verify authentication status
  - Requires authentication
  - Returns: User object if authenticated

### Messages
- `GET /api/messages/users` - Get all users
  - Requires authentication
  - Returns: List of users with their online status

- `GET /api/messages/:id` - Get conversation with a user
  - Requires authentication
  - Returns: Message history with the specified user

- `POST /api/messages/send/:id` - Send a message
  - Requires authentication
  - Accepts: `text` or `image`
  - Returns: Sent message object

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account (for file storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamayan2011/bytechat-backend.git
   cd bytechat-backend
   ```

2. **Set up the backend**
   ```bash
   cp .env.example .env  # Update with your configuration
   npm install
   npm run dev
   ```

3. **Set up the frontend** 
Visit the frontend repository [here](https://github.com/iamayan2011/bytechat-frontend).

4. **Open the application**
   The backend should be running at `http://localhost:4999`

## Environment Variables
Refer the `env.example` files in both the frontend and backend directories for environment variables.

## Available Scripts

### Backend
- `npm run dev` - Start the development server with hot-reload
  - Watches for file changes and restarts server
  - Uses `ts-node-dev` for TypeScript execution
  - Runs on `http://localhost:5000` by default

- `npm run build` - Build for production
  - Compiles TypeScript to JavaScript in `dist` directory

- `npm start` - Start the production server
  - Runs the compiled JavaScript from `dist` directory

### Frontend
- `npm run dev` - Start Vite development server
  - Hot Module Replacement (HMR) enabled
  - Runs on `http://localhost:5173` by default

- `npm run build` - Build for production
  - Creates optimized production build in `dist` directory
  - Minifies and tree-shakes the code

- `npm run preview` - Preview the production build locally
  - Serves the production build for testing

- `npm run lint` - Run ESLint
  - Lints all TypeScript and TypeScript React files
  - Follows Airbnb JavaScript Style Guide

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Technical Stack Details

### Frontend
- **React 19**: Latest React version with concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Next generation frontend tooling
- **Zustand**: Lightweight state management
- **Socket.IO Client**: Real-time communication
- **React Hook Form**: Form handling and validation
- **React Hot Toast**: Toast notifications
- **Tailwind CSS + daisyUI**: Utility-first CSS framework with component library
- **React Icons**: Icon library
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB + Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **Socket.IO**: Real-time bidirectional communication
- **Cloudinary**: File and image storage
- **Bcrypt**: Password hashing
- **Joi**: Request validation
- **CORS**: Cross-Origin Resource Sharing

## Development Workflow

1. **Setup**
   - Install dependencies: `npm install` in both frontend and backend
   - Configure environment variables (see `env.example` files)
   - Start development servers

2. **Development**
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`

3. **Testing**
   - Lint code: `npm run lint`
   - Test API endpoints using Postman or similar tools
   - Unit Testing is planned.

4. **Production**
   - Build frontend: `npm run build`
   - Build backend: `npm run build`
   - Start production server: `npm start`

## Acknowledgments
- Codesistency

---

Built with ❤️ by Ayan Raza
