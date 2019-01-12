# json-form-data
A library to convert JavasScript objects into FormData.

[![Build Status](https://travis-ci.org/hyperatom/json-form-data.svg?branch=master)](https://travis-ci.org/hyperatom/json-form-data)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=YlVjYXpTc0RuR3BVUE5mTEdPWG9GZz09LS05cVlMTUIwSVRJUlkxd1EzbWZRR1hBPT0=--61c69b57f61170df75fcd4bc038eaa4f84425c4e)](https://www.browserstack.com/automate/public-build/YlVjYXpTc0RuR3BVUE5mTEdPWG9GZz09LS05cVlMTUIwSVRJUlkxd1EzbWZRR1hBPT0=--61c69b57f61170df75fcd4bc038eaa4f84425c4e)

## Features
* Supports CommonJS and AMD module loaders
* Converts nested objects and arrays
* Compatible with legacy web browsers
* Supports all primitive data types
* Supports File and FileList data types
* Skips null and undefined values
* Good unit test coverage

## Overview

This library converts a JSON object into FormData, 
allowing files and primitive data to be sent to a server in a single HTTP request.

Single Page Web Applications (SPA's) primarily use JSON formatted payloads. 
This causes problems when you need to send a file along with additional data,
as files cannot be sent to a server in a JSON formatted payload.

This library addresses the limitations of similar libraries by allowing conversion of deeply nested JSON objects,
better unit test coverage and exclusion of `null` and `undefined` values from the resulting FormData.

## Example

**Input as JSON**

```
var testObject = {
    prop1: 'test',
    prop2: 2,
    prop3: null,
    prop4: undefined,
    prop5: true,
    prop6: false,
    prop7: new File(['file content'], 'my_file.txt'),
    prop8: {
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

**Output as multipart/formdata**

```
prop1
test

prop2
2

prop5
1

prop6
0

prop7
Content-Disposition: form-data; name="My File"; filename="my_file.txt"
Content-Type: text/plain

prop8[prop1]
test

prop8[prop2]
2

prop8[prop5]
1

prop8[prop6]
0

prop8[prop7][0]
test

prop8[prop7][1]
2

prop8[prop7][2]
1

prop8[prop7][3]
0

```


## Browser Support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| :---------: | :---------: | :---------: | :---------: |
| IE10, IE11, Edge | latest | latest | latest 

## Contributors

- <a href="https://github.com/hyperatom">hyperatom</a>
- <a href="https://github.com/illiatdesdindes">illiatdesdindes</a>

## Sponsors

<a href="http://browserstack.com/">
    <img alt="BrowserStack Logo" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" width="200" />
</a>

We use BrowserStack to automate our regression tests to ensure compatibility with supported browsers.