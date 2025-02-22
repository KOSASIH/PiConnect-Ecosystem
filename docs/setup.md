# PiConnect Ecosystem - Setup Instructions

Welcome to the PiConnect Ecosystem project! This document provides step-by-step instructions for setting up the development environment.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager, comes with Node.js)
- **Git** (for version control)

## Getting Started

Follow these steps to set up the project:

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/KOSASIH/piconnect-ecosystem.git
```

Replace `yourusername` with your GitHub username.

### 2. Navigate to the Project Directory

Change into the project directory:

```bash
cd piconnect-ecosystem
```

### 3. Install Dependencies

Install the required dependencies for both the frontend and backend:

```bash
# For the frontend
cd src/frontend
npm install

# For the backend
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `src/backend` directory and add the necessary environment variables. Here’s an example:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/piconnect
JWT_SECRET=your_jwt_secret
```

Make sure to replace the values with your actual configuration.

### 5. Start the Development Servers

You can start both the frontend and backend servers. Open two terminal windows or tabs:

**Terminal 1** (Backend):

```bash
cd src/backend
npm start
```

**Terminal 2** (Frontend):

```bash
cd src/frontend
npm start
```

### 6. Access the Application

Once both servers are running, you can access the application in your web browser at:

```
http://localhost:3000
```

### 7. Running Tests

To run tests for the frontend and backend, use the following commands:

**Frontend Tests:**

```bash
cd src/frontend
npm test
```

**Backend Tests:**

```bash
cd src/backend
npm test
```

### 8. Building for Production

To create a production build of the frontend application, run the following command in the `src/frontend` directory:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized production files.

### 9. Deployment

Refer to the `deploy.js` script in the `src/frontend/scripts` directory for deployment instructions.

## Troubleshooting

If you encounter any issues during setup, please check the following:

- Ensure that all dependencies are installed correctly.
- Verify that your environment variables are set up properly.
- Check the console for any error messages and address them accordingly.

## Conclusion

You are now ready to start developing with the PiConnect Ecosystem! If you have any questions or need further assistance, feel free to reach out to the project maintainers.

Happy coding!
