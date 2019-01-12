const includePolyfills = function(files) {

    files.unshift({
        pattern: __dirname + '/node_modules/weakmap-polyfill/weakmap-polyfill.js',
        included: true,
        served: true,
        watched: false
    });
};

includePolyfills.$inject = ['config.files'];

module.exports = function(config) {

    var localReporters = [
        'mocha'
    ];

    var ciReporters = [
        'mocha',
        'BrowserStack'
    ];

    var localBrowsers = [
        'ChromeHeadless'
    ];

    var ciBrowsers = [
        'chrome_latest_mac',
        'firefox_latest_mac',
        'safari_latest_mac',
        'edge_16_windows_10',
        'edge_15_windows_10',
        'edge_14_windows_10',
        'ie_11_windows_10',
        'ie_10_windows_10'
    ];

    var build = Math.random().toString(36).substring(2, 15);

    config.set({
        browserNoActivityTimeout: 120000,
        browserDisconnectTimeout: 120000,
        frameworks: ['mocha', 'chai', 'include-polyfills'],
        files: ['tests/**/*.js'],
        reporters: process.env.CI === 'true' ? ciReporters : localReporters,
        browsers: process.env.CI === 'true' ? ciBrowsers : localBrowsers,
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        client: {
            mocha: {
                require: [
                    require.resolve('formdata-polyfill'),
                    require.resolve('./src/jsonToFormData')
                ]
            }
        },
        plugins: [
            'karma-*',
            {
                'framework:include-polyfills': ['factory', includePolyfills]
            }
        ],
        browserStack: {
            project: 'json-form-data',
            build: build
        },
        customLaunchers: {
            chrome_latest_mac: {
                base: 'BrowserStack',
                browser: 'chrome',
                browser_version: '65.0',
                os: 'OS X',
                os_version: 'High Sierra'
            },
            firefox_latest_mac: {
                base: 'BrowserStack',
                browser: 'Firefox',
                browser_version: '60.0 beta',
                os: 'OS X',
                os_version: 'High Sierra'
            },
            safari_latest_mac: {
                base: 'BrowserStack',
                browser: 'Safari',
                browser_version: '11.1',
                os: 'OS X',
                os_version: 'High Sierra'
            },
            edge_16_windows_10: {
                base: 'BrowserStack',
                browser: 'Edge',
                browser_version: '16.0',
                os: 'Windows',
                os_version: '10'
            },
            edge_15_windows_10: {
                base: 'BrowserStack',
                browser: 'Edge',
                browser_version: '15.0',
                os: 'Windows',
                os_version: '10'
            },
            edge_14_windows_10: {
                base: 'BrowserStack',
                browser: 'Edge',
                browser_version: '14.0',
                os: 'Windows',
                os_version: '10'
            },
            ie_11_windows_10: {
                base: 'BrowserStack',
                browser: 'IE',
                browser_version: '11.0',
                os: 'Windows',
                os_version: '10'
            },
            ie_10_windows_10: {
                base: 'BrowserStack',
                browser: 'IE',
                browser_version: '10.0',
                os: 'Windows',
                os_version: '8'
            }
        }
    })
};