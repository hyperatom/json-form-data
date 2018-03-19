(function() {

    function isArray(val) {

        return toString.call(val) === '[object Array]';
    }

    function isObject(val) {

        return !isArray(val) && typeof val === 'object' && !!val;
    }

    window.jsonToFormData = function(jsonObject, parentKey, carryFormData) {

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

                        propName = parentKey + '[' + index + ']';
                    }

                    if (isArray(jsonObject[key]) || isObject(jsonObject[key])) {

                        window.jsonToFormData(jsonObject[key], propName, formData);

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
    };
})();