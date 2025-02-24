// build.js

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js'); // Import your Webpack configuration

const build = () => {
    console.log('Starting the build process...');

    // Clean the output directory
    const outputDir = path.resolve(__dirname, '../dist');
    if (fs.existsSync(outputDir)) {
        fs.rmdirSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir);

    // Run Webpack
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error('Webpack encountered an error:', err);
            process.exit(1);
        }

        // Log the build stats
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true, // Shows colors in the console
        }));

        console.log('Build completed successfully!');
    });
};

// Execute the build function
build();
