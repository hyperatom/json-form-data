# json-form-data
A library to convert javascript objects into form data.

[![Build Status](https://travis-ci.org/hyperatom/json-form-data.svg?branch=master)](https://travis-ci.org/hyperatom/json-form-data)

## Features
* Converts nested objects and arrays
* Compatible with legacy web browsers
* Works with all primitive data types
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
    prop6: false
};

window.jsonToFormData(testObject);
```