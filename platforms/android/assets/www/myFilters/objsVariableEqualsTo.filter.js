angular.module('myFilters.objsVariableEqualsTo', []).
filter('objsVariableEqualsTo', function() {
    return function(collection, key, value) {
        var resColl = [];

        collection.forEach(function(item) {
            if (item[key] === value) {
                resColl.push(item);
            }
        });

        return resColl;
    };
});
