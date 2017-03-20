angular.module('taskListApp').config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');

        // ui-router config
        $stateProvider
        .state('mainpage', {
            url: '/mainpage',
            template: '<main-page-component></main-page-component>'
        })
        .state('tasklist', {
            url: '/tasklist',
            template: '<task-list-component></task-list-component>'
        });

        // If none of above
        $urlRouterProvider.otherwise('/mainpage');

        // On any request error
        //$httpProvider.interceptors.push('reqErrorHandler');
        //$httpProvider.interceptors.push('resErrorHandler');
    }]);
