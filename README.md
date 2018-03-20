# json-form-data
A library to convert javascript objects into form data.

[![Build Status](https://travis-ci.org/hyperatom/json-form-data.svg?branch=master)](https://travis-ci.org/hyperatom/json-form-data)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=YlVjYXpTc0RuR3BVUE5mTEdPWG9GZz09LS05cVlMTUIwSVRJUlkxd1EzbWZRR1hBPT0=--61c69b57f61170df75fcd4bc038eaa4f84425c4e)](https://www.browserstack.com/automate/public-build/YlVjYXpTc0RuR3BVUE5mTEdPWG9GZz09LS05cVlMTUIwSVRJUlkxd1EzbWZRR1hBPT0=--61c69b57f61170df75fcd4bc038eaa4f84425c4e)

## Features
* Supports CommonJS and AMD module loaders
* Converts nested objects and arrays
* Compatible with legacy web browsers
* Works with primitive and File data types
* Skips null and undefined values
* Good unit test coverage

## Usage
```
var testObject = {
    prop1: 'test',
    prop2: 2,
    prop3: null,
    prop4: undefined,
    prop5: true,
    prop6: false,
    prop7: {
        prop1: 'test',
        prop2: 2,
        prop3: null,
        prop4: undefined,
        prop5: true,
        prop6: false,
        prop7: [
            'test', 
            2, 
            null, 
            undefined, 
            true, 
            false
        ] 
    }
};

var formData = window.jsonToFormData(testObject);
```

<a href="http://browserstack.com/">
    <img alt="BrowserStack Logo" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" width="200" />
</a>

We use BrowserStack to automate our testing against multiple browsers to ensure compatibility with legacy browsers.