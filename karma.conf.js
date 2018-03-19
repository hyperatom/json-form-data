module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: ['tests/**/*.js'],
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        client: {
            mocha: {
                require: [require.resolve('./src/jsonToFormData')]
            }
        }
    })
};