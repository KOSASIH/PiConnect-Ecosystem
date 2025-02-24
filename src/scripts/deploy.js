// deploy.js

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const remoteServer = 'user@your-server.com'; // Replace with your server's SSH user and address
const remotePath = '/var/www/your-app'; // Replace with the path on your server
const localBuildPath = path.resolve(__dirname, '../dist'); // Path to the built application

// Function to execute shell commands
const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}`);
                console.error(stderr);
                reject(error);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
};

// Function to deploy the application
const deploy = async () => {
    try {
        console.log('Starting deployment process...');

        // Step 1: Build the application
        console.log('Building the application...');
        await executeCommand('node scripts/build.js'); // Adjust the path to your build script

        // Step 2: Transfer files to the remote server
        console.log('Transferring files to the remote server...');
        await executeCommand(`rsync -avz --delete ${localBuildPath}/ ${remoteServer}:${remotePath}/`);

        // Step 3: Restart the server (if applicable)
        console.log('Restarting the server...');
        await executeCommand(`ssh ${remoteServer} 'pm2 restart your-app'`); // Adjust the command to restart your application

        console.log('Deployment completed successfully!');
    } catch (error) {
        console.error('Deployment failed:', error);
    }
};

// Execute the deploy function
deploy();
