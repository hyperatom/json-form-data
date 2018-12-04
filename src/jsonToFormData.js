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

    function isArray(val) {

        var toString = ({}).toString;

        return toString.call(val) === '[object Array]';
    }

    function isObject(val) {

        return !isArray(val) && typeof val === 'object' && !!val;
    }

    function merge(object1, object2) {
        object2 = object2 || {}
        return [object1, object2]
            .reduce(function (r, o) {
                Object.keys(o).forEach(function (k) {
                    r[k] = o[k];
                });
                return r;
            }, {});
    }

    function doConvert(jsonObject, parentKey, carryFormData, options) {

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

                        index_string = ''
                        if (isArray(jsonObject[key]) || isObject(jsonObject[key]) || options.showLeafArrayIndexes ) {
                            index_string = index
                        }
                        propName = parentKey + '[' + index_string + ']';
                    }

                    if (jsonObject[key] instanceof File) {

                        formData.append(propName, jsonObject[key]);

                    }  else if (jsonObject[key] instanceof FileList) {

                        for (var j = 0; j < jsonObject[key].length; j++) {

                            formData.append(propName + '[' + j + ']', jsonObject[key].item(j));
                        }

                    } else if (isArray(jsonObject[key]) || isObject(jsonObject[key])) {

                        doConvert(jsonObject[key], propName, formData, options);

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

    function convert(jsonObject, options) {
        var defaultOptions = {
            showLeafArrayIndexes: true,
        };

        options = merge(defaultOptions, options);

        return doConvert(jsonObject, undefined, undefined, options);
    }

    return convert;
}));
