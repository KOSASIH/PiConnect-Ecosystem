# PiConnect Ecosystem - Contribution Guide

Thank you for your interest in contributing to the PiConnect Ecosystem! We welcome contributions from the community. This guide outlines the process for contributing to the project, including setting up your development environment, coding standards, and how to submit your contributions.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setting Up the Development Environment](#setting-up-the-development-environment)
3. [Coding Standards](#coding-standards)
4. [Submitting Contributions](#submitting-contributions)
5. [Code of Conduct](#code-of-conduct)
6. [Questions and Support](#questions-and-support)

## Getting Started

To contribute to the PiConnect Ecosystem, you should be familiar with the following technologies:

- JavaScript (ES6+)
- React (for the frontend)
- Node.js and Express (for the backend)
- MongoDB (for the database)

## Setting Up the Development Environment

1. **Fork the Repository**: 
   - Go to the [PiConnect Ecosystem GitHub repository](https://github.com/KOSASIH/piconnect-ecosystem) and click on the "Fork" button to create a copy of the repository under your GitHub account.

2. **Clone Your Fork**: 
   - Open your terminal and run the following command to clone your forked repository:
     ```bash
     git clone https://github.com/KOSASIH/piconnect-ecosystem.git
     ```

3. **Install Dependencies**: 
   - Navigate to the project directory and install the required dependencies for both the frontend and backend:
     ```bash
     cd piconnect-ecosystem/src/frontend
     npm install
     cd ../backend
     npm install
     ```

4. **Run the Application**: 
   - Start the development servers for both the frontend and backend:
     ```bash
     # Backend
     cd src/backend
     npm start

     # Frontend
     cd src/frontend
     npm start
     ```

5. **Open the Application**: 
   - Access the application in your web browser at `http://localhost:3000`.

## Coding Standards

To maintain code quality and consistency, please adhere to the following coding standards:

- **JavaScript**: Follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).
- **React**: Use functional components and hooks where applicable.
- **Comments**: Write clear and concise comments to explain complex logic.
- **Commit Messages**: Use clear and descriptive commit messages. Follow the format:
  ```
  type(scope): subject
  ```
  Example:
  ```
  feat(auth): add user login functionality
  ```

## Submitting Contributions

1. **Create a New Branch**: 
   - Before making any changes, create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Make Your Changes**: 
   - Implement your changes and test them thoroughly.

3. **Commit Your Changes**: 
   - Stage your changes and commit them with a descriptive message:
     ```bash
     git add .
     git commit -m "feat: add new feature"
     ```

4. **Push to Your Fork**: 
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

5. **Create a Pull Request**: 
   - Go to the original repository on GitHub and click on the "Pull Requests" tab. Click on "New Pull Request" and select your branch. Provide a clear description of your changes and submit the pull request.

## Code of Conduct

We expect all contributors to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and considerate in your interactions with others.

## Questions and Support

If you have any questions or need assistance, feel free to reach out to the project maintainers or open an issue in the repository. We appreciate your contributions and look forward to collaborating with you!

Thank you for helping to make the PiConnect Ecosystem better!
