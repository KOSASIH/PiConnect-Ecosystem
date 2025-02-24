// test.js

const { exec } = require('child_process');

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

// Function to run tests
const runTests = async () => {
    try {
        console.log('Starting test execution...');

        // Step 1: Run Jest tests
        console.log('Running tests with Jest...');
        await executeCommand('npx jest'); // Adjust the command if necessary

        console.log('All tests completed successfully!');
    } catch (error) {
        console.error('Test execution failed:', error);
    }
};

// Execute the runTests function
runTests();
