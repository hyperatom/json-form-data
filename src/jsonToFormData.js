(function (root, factory) {

    if (typeof define === 'function' && define.amd) {

        define([], function() {
            return (root.jsonToFormData = factory());
        });

    } else if (typeof module === 'object' && module.exports) {

        module.exports = (root.jsonToFormData = factory());

    } else {

        root.jsonToFormData = factory();
    }

}(this, function() {

    function mergeObjects(object1, object2) {

        var objectsToMerge = [object1, object2];

        return objectsToMerge.reduce(function (carry, objectToMerge) {

            Object.keys(objectToMerge).forEach(function (objectKey) {
                carry[objectKey] = objectToMerge[objectKey];
            });

            return carry;

        }, {});
    }

    function isArray(val) {

        var toString = ({}).toString;

        return toString.call(val) === '[object Array]';
    }

    function isObject(val) {

        return !isArray(val) && typeof val === 'object' && !!val;
    }

    function convert(jsonObject, options) {

        var defaultOptions = {
            showLeafArrayIndexes: true
        };

        var mergedOptions = mergeObjects(defaultOptions, options || {});

        return convertRecursively(jsonObject, mergedOptions);
    }

    function convertRecursively(jsonObject, options, parentKey, carryFormData) {

        var formData = carryFormData || new FormData();

        var index = 0;

        for (var key in jsonObject) {

            if (jsonObject.hasOwnProperty(key)) {

                if (jsonObject[key] !== null && jsonObject[key] !== undefined) {

                    var propName = parentKey || key;

                    if (parentKey && isObject(jsonObject)) {

                        propName = parentKey + '[' + key + ']';
                    }

                    if (parentKey && isArray(jsonObject)) {

                        if (isArray(jsonObject[key]) || isObject(jsonObject[key]) || options.showLeafArrayIndexes ) {
                            propName = parentKey + '[' + index + ']';
                        } else {
                            propName = parentKey + '[]';
                        }
                    }

                    if (jsonObject[key] instanceof File) {

                        formData.append(propName, jsonObject[key]);

                    }  else if (jsonObject[key] instanceof FileList) {

                        for (var j = 0; j < jsonObject[key].length; j++) {

                            formData.append(propName + '[' + j + ']', jsonObject[key].item(j));
                        }

                    } else if (isArray(jsonObject[key]) || isObject(jsonObject[key])) {

                        convertRecursively(jsonObject[key], options, propName, formData);

                    } else if (typeof jsonObject[key] === 'boolean') {

                        formData.append(propName, +jsonObject[key] ? '1': '0');

                    } else {

                        formData.append(propName, jsonObject[key]);
                    }
                }
            }

            index++;
        }

        return formData;
    }

    return convert;
}));