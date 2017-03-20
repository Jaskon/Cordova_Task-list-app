'use strict'

describe('HeaderController', function() {
	var $ctrl, $scope, $rootScope;

	beforeEach(module('taskListApp'));

	beforeEach(inject(function($controller, _$rootScope_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$ctrl = $controller('headerController', {$scope: $scope});
	}));

	it('should change active class to the second menu element', function() {
		$rootScope.$broadcast('pageChanged', {name: 'Main page'});
		expect($scope.menuList[0].active).toBe(true);
		expect($scope.menuList[1].active).toBe(false);

		$rootScope.$broadcast('pageChanged', {name: 'List of tasks'});
		expect($scope.menuList[0].active).toBe(false);
		expect($scope.menuList[1].active).toBe(true);
	});
});