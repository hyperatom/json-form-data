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

    config.set({
        frameworks: ['mocha', 'chai'],
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
                    require.resolve('js-polyfills/es6'),
                    require.resolve('js-polyfills/typedarray'),
                    require.resolve('formdata-polyfill'),
                    require.resolve('./src/jsonToFormData')
                ]
            }
        },
        browserStack: {
            project: 'json-form-data'
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
                browser_version: '11.0',
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