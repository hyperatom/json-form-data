(function() {

    function isReallyArray(val) {

        return toString.call(val) === '[object Array]';
    }

    function isReallyObject(val) {

        return !isReallyArray(val) && typeof val === 'object' && !!val;
    }

    window.jsonToFormData = function(data, parentKey, previousFormData) {

        var formData = previousFormData || new FormData();

        var index = 0;

        for (var key in data) {

            if (data.hasOwnProperty(key)) {

                if (data[key] !== null && data[key] !== undefined) {

                    var propName = parentKey || key;

                    if (parentKey && isReallyObject(data)) {

                        propName = parentKey + '[' + key + ']';
                    }

                    if (parentKey && isReallyArray(data)) {

                        propName = parentKey + '[' + index + ']';
                    }

                    if (typeof data[key] === 'boolean') {

                        formData.append(key, +data[key] ? '1': '0');

                    } else if (isReallyArray(data[key]) || isReallyObject(data[key])) {

                        return window.jsonToFormData(data[key], propName, formData);

                    } else {

                        formData.append(propName, data[key]);
                    }
                }
            }

            index++;
        }

        return formData;
    };
})();