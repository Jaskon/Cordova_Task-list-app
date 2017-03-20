angular.module('mainPage').component('mainPageComponent', {
    templateUrl: 'mainPageComponent/mainPage.template.html',
    controller: [
        '$scope',
        '$rootScope',
        '$stateParams',
        '$timeout',
        'tasksModel',
        function($scope, $rootScope, $stateParams, $timeout, tasksModel) {
            // Broadcast 'pageChanged' event to all child element
            // relatively to $rootScope (= to all elements)
            $rootScope.$broadcast('pageChanged', {name: 'Main page'});

            $scope.tasks = tasksModel.tasks;

            // Current date and time updating (every second)
            var timeUpdating = function() {
                $scope.date = Date.now();
                $timeout(timeUpdating, 1000);
            };
            timeUpdating();
        }
    ]
});
