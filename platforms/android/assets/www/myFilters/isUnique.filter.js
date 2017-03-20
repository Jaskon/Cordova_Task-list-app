// Filter that check if there is no another values with this key
// in this collection
angular.module('myFilters.isUnique', []).
filter('isUnique', function() {
    return function(collection, key, value) {
        var count = 0;

        collection.forEach(function(item) {
            if (item[key] === value) {
                count++;
            }
        });

        // 1 - itself
        return count > 1 ? false : true;
    };
});
