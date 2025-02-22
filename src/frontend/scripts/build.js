// src/frontend/scripts/build.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define paths
const srcDir = path.join(__dirname, '../'); // Source directory
const buildDir = path.join(__dirname, '../dist'); // Build output directory

// Function to clean the build directory
const cleanBuildDir = () => {
    if (fs.existsSync(buildDir)) {
        fs.rmdirSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
};

// Function to copy static assets
const copyAssets = () => {
    const assetsDir = path.join(srcDir, 'assets');
    if (fs.existsSync(assetsDir)) {
        fs.readdirSync(assetsDir).forEach(file => {
            const srcFile = path.join(assetsDir, file);
            const destFile = path.join(buildDir, file);
            fs.copyFileSync(srcFile, destFile);
        });
    }
};

// Function to build the frontend application
const buildFrontend = () => {
    return new Promise((resolve, reject) => {
        exec('webpack --mode production', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during build: ${stderr}`);
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
};

// Main build function
const build = async () => {
    try {
        console.log('Cleaning build directory...');
        cleanBuildDir();

        console.log('Building frontend application...');
        await buildFrontend();

        console.log('Copying static assets...');
        copyAssets();

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
    }
};

// Run the build process
build();
