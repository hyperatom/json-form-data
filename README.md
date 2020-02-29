# json-form-data
A library to convert JavasScript objects into form data.

[![Build Status](https://travis-ci.org/hyperatom/json-form-data.svg?branch=master)](https://travis-ci.org/hyperatom/json-form-data)
[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=elFHOGNrR2tPTVBIUTRhNmRkTis2WXRDdEpsN29aN2tFWUJaTU5IelRQaz0tLXMwcU0rWFFWZG1yQm1BRFhDUUNxb2c9PQ==--3768e678743e72a8da61640d1224bac0bd7a8754)](https://automate.browserstack.com/public-build/elFHOGNrR2tPTVBIUTRhNmRkTis2WXRDdEpsN29aN2tFWUJaTU5IelRQaz0tLXMwcU0rWFFWZG1yQm1BRFhDUUNxb2c9PQ==--3768e678743e72a8da61640d1224bac0bd7a8754)

## Features
* Supports CommonJS and AMD module loaders
* Converts nested objects and arrays
* Compatible with legacy web browsers
* Supports all primitive data types
* Converts `Date` objects to ISO strings
* Supports `File` and `FileList` data types
* Skips `null` and `undefined` values
* Custom value mappings
* Ability to use a custom FormData object
* Good unit test coverage

## Overview

This library converts a JSON object into form data, 
allowing files and primitive data to be sent to a server in a single HTTP request.

Single Page Web Applications (SPA's) primarily use JSON formatted payloads. 
This causes problems when you need to send files in the same request as primitive data,
as files cannot be sent to a server in a JSON formatted payload.

This library addresses the limitations of similar libraries by allowing conversion of deeply nested JSON objects,
better unit test coverage and exclusion of `null` and `undefined` values from the resulting form data.

A custom mapping function allows JSON values to be transformed before they are appended to form data.
You can use this to provide your server side with the values it expects.

You can use json-form-data in a number of different environments including ReactNative apps and web browsers.
A custom FormData object can be passed into the `initialFormData` option to support environments that do not have a global FormData object.

## Usage

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
    prop8: new Date('05 January 2020 16:52:00 GMT'),
    prop9: {
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

// These values demonstrate the default options
var options = {
    initialFormData: new FormData(),
    showLeafArrayIndexes: true,
    includeNullValues: false,
    mapping: function(value) {
        if (typeof value === 'boolean') {
            return +value ? '1': '0';
        }
        return value;
    }
};

var formData = window.jsonToFormData(testObject, options);
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

prop8
2020-01-05T16:52:00.000Z

prop9[prop1]
test

prop9[prop2]
2

prop9[prop5]
1

prop9[prop6]
0

prop9[prop7][0]
test

prop9[prop7][1]
2

prop9[prop7][2]
1

prop9[prop7][3]
0

```

## Options

| Option | Default | Description |
| --- | --- | --- |
| `initialFormData` | `new FormData()` | Existing form data which values will be appended to. |
| `showLeafArrayIndexes` | `true` | Shows indexes for items in array leaf nodes. |
| `includeNullValues` | `false` | Includes null values in the form data. |
| `mapping` | `x => y` | Overrides the default value mappings `true => '1'` and `false => '0'`.

## CDN

json-form-data is also  available via a CDN. Just include the following script tag in your page.

`<script src="https://unpkg.com/json-form-data@^1.7.0/dist/jsonToFormData.min.js" />`

## Browser Support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br> IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br> Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br> Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br> Safari |
| :---------: | :---------: | :---------: | :---------: |
| IE10, IE11, Edge | latest | latest | latest 

## Contributors

- <a href="https://github.com/hyperatom">hyperatom</a>
- <a href="https://github.com/illiatdesdindes">illiatdesdindes</a>
- <a href="https://github.com/superhawk610">superhawk610</a>
- <a href="https://github.com/Finesse">Finesse</a>

## Sponsors

<a href="http://browserstack.com/">
    <img alt="BrowserStack Logo" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" width="200" />
</a>

We use BrowserStack to automate our regression tests to ensure compatibility with supported browsers.
