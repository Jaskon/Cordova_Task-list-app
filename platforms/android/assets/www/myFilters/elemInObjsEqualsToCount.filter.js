// Filter that count all variables with this key
// that equals to this value in collection of objects
angular.module('myFilters.elemInObjsEqualsToCount', []).
filter('elemInObjsEqualsToCount', function() {
    return function(collection, key, value) {
        var count = 0;

        collection.forEach(function(item) {
            if (item[key] === value) {
                count++;
            }
        });

        return count;
    };
});
