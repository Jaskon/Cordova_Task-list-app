'use strict';

describe('tasksModel', function() {
    var tasksModel, $httpBackend, $rootScope, $scope, getTasksRequestHandler;

    beforeEach(angular.mock.module('taskListApp'));
    beforeEach(inject(function(_tasksModel_, _$httpBackend_, _$rootScope_) {
        tasksModel = _tasksModel_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();


        getTasksRequestHandler = $httpBackend.whenGET('/getTasks').respond([]);
        $httpBackend.whenPOST('/updateTasks').respond(200);
        $httpBackend.whenPOST('/updateTask').respond(200);
        $httpBackend.whenPOST('/insertTask').respond({_id: '1'});
        $httpBackend.whenPOST('/deleteTask').respond(200);

        // Initial request
        $httpBackend.expectGET('/getTasks');
        $httpBackend.flush();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should exists', function() {
        expect(tasksModel).toBeDefined();
    });

    describe('tasks', function() {
        it('should be empty', function() {
            expect(tasksModel.tasks).toEqual([]);
        });

        it('should not be empty', function() {
            // Changing /getTasks request
            getTasksRequestHandler.respond([{ severity: 1, text: 'Task text 1', completed: false }]);
            $httpBackend.expectGET('/getTasks');

            tasksModel.updateDataFromDB();
            $httpBackend.flush();
            expect(tasksModel.tasks).toEqual([{ severity: 1, text: 'Task text 1', completed: false }]);
        });
    });

    describe('requests check', function() {
        it('should post an /updateTasks request', function() {
            $httpBackend.expectPOST('/updateTasks');

            tasksModel.dbUpdateAll();
            $httpBackend.flush();
        });

        it('should post an /updateTask request', function() {
            $httpBackend.expectPOST('/updateTask');

            tasksModel.dbUpdate({});
            $httpBackend.flush();
        });

        it('should post an /insertTask request', function() {
            $httpBackend.expectPOST('/insertTask');

            tasksModel.dbInsert({});
            $httpBackend.flush();
        });

        it('should post a /deleteTask request', function() {
            $httpBackend.expectPOST('/deleteTask');

            tasksModel.dbDelete({});
            $httpBackend.flush();
        });
    });
});