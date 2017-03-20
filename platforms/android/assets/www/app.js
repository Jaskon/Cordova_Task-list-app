// App header controller
angular.module('taskListApp').controller('headerController', [
    '$scope',
    'tasksModel',
    '$http',
    '$timeout',
    function($scope, tasksModel, $http, $timeout) {
        // Header's menu list
        $scope.menuList = [
            {name: 'Main page', link: '#!/mainpage', active: false},
            {name: 'List of tasks', link: '#!/tasklist', active: false}
        ];

        // When received 'pageChanged' event
        $scope.$on('pageChanged', function(event, data) {
            // Choose the active element in the header's menu list
            $scope.menuList.forEach(function(elem) {
                if (elem.name === data.name) {
                    elem.active = true;
                } else {
                    elem.active = false;
                }
            });
        });


        // Http error handlers
        $scope.httpErrorText = '';
        // On response error (show an error element)
        $scope.responseError = { state: false, timer: {} };
        $scope.$on('responseError', function(event) {
            // If error element is shown - update it's animation
            if ($scope.responseError.state == true
                && $scope.responseError.timer.$$state.status === 0) {

                $timeout.cancel($scope.responseError.timer);
                $scope.responseError.state = false;
            }

            $timeout(function() {
                $scope.httpErrorText = 'Received an error from the server';
                $scope.responseError.state = true;
                $scope.responseError.timer = $timeout(function() {
                    $scope.responseError.state = false;
                }, 3300);
            }, 0);
        });

        // On request error (show an error element)
        $scope.requestError = { state: false, timer: {} };
        $scope.$on('requestError', function(event) {
            // If error element is shown - update it's animation
            if ($scope.requestError.state == true
                && $scope.requestError.timer.$$state.status === 0) {

                $timeout.cancel($scope.requestError.timer);
                $scope.requestError.state = false;
            }

            $timeout(function() {
                $scope.httpErrorText = 'Something did wrong while requesting server';
                $scope.requestError.state = true;
                $scope.requestError.timer = $timeout(function() {
                    $scope.requestError.state = false;
                }, 3300);
            }, 0);
        });


        // Update tasksModel data when clicking on 'update' menu link
        $scope.updateData = function() {
            tasksModel.updateDataFromDB();
        };


        // Wathing for a pendingRequests count.
        // Algorithm is not 100% right and needed to work via array of
        // loadingTimeouts[] and binding them to their requests
        $scope.loading = false;
        var loadingTimeout;
        $scope.$watch(function() { return tasksModel.currentRequests.length; }, function() {
            if (tasksModel.currentRequests.length > 0) {
                if (!$scope.loading && (!loadingTimeout || loadingTimeout.$$state.status !== 0))
                    loadingTimeout = $timeout(function() {
                        $scope.loading = true;
                    }, 500);
            } else {
                if (loadingTimeout && loadingTimeout.$$state.status === 0)
                    $timeout.cancel(loadingTimeout);
                $scope.loading = false;
            }
        });
    }
]);
