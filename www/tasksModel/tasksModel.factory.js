// App requests directive
angular.module('taskListApp').factory('tasksModel', [
    '$rootScope',
    '$http',
    function($rootScope, $http) {
        // Model?
        var tasks = [];


        // Template for post requests below
        /*var post = function(req, obj, callback) {
            $http.post(req, obj)
            .then(function(response) {
                if (callback) {
                    callback(response);
                }
            }, function(response) {
                console.log(['Error while doing ', req, ' request:'].join(''));
                console.log(response.config.data);
            });
        };*/
        var post = function(req, obj, callback) {
            var storagedTasks = window.localStorage.tasks ? JSON.parse(window.localStorage.tasks) : [];

            var freeId = 0;
            while (true) {
                for (var i = 0; i < storagedTasks.length; i++)
                    if (freeId == storagedTasks[i]._id) {
                        freeId++;
                        break;
                    }
                if (i == storagedTasks.length)
                    break;
            }

            switch(req) {
                case '/updateTasks':
                    tasks = storagedTasks;
                    callback({data:storagedTasks});
                break;

                case '/updateTask':
                    for (var i = 0; i < storagedTasks.length; i++)
                        if (storagedTasks[i]._id === obj._id) {
                            for (var j in obj)
                                storagedTasks[i][j] = obj[j];
                            break;
                        }
                    window.localStorage.tasks = JSON.stringify(storagedTasks);
                break;

                case '/insertTask':
                    obj.task._id = freeId;
                    storagedTasks.push(obj.task);
                    window.localStorage.tasks = JSON.stringify(storagedTasks);
                    callback({data: {_id: freeId}});
                break;

                case '/deleteTask':
                    for (var i = 0; i < storagedTasks.length; i++)
                        if (storagedTasks[i]._id == obj.task._id) {
                            storagedTasks.splice(i, 1);
                            break;
                        }
                    window.localStorage.tasks = JSON.stringify(storagedTasks);
                break;
            }
        }


        // Post request - update ALL tasks in db (sending all tasks)
        var dbUpdateAll = function(callback) {
            post('/updateTasks', tasks, callback);
        };

        // Post request - update task in db
        var dbUpdate = function(task, callback) {
            post('/updateTask', task, callback);

            for (var i = 0; i < tasks.length; i++)
                if (tasks[i]._id === task._id) {
                    for (var j in task)
                        tasks[i][j] = task[j];
                    break;
                }
        };

        // Post request - insert task in db
        var dbInsert = function(task, callback) {
            post('/insertTask',
                {task: task},
                function(response) {
                    task._id = response.data._id;

                    if (callback)
                        callback();
                });

            tasks.push(task);
        };

        // Post request - delete task from db
        var dbDelete = function(task, callback) {
            post('/deleteTask', {task: task}, callback);

            for (var i = 0; i < tasks.length; i++)
                if (tasks[i]._id === task._id) {
                    tasks.splice(i, 1);
                    break;
                }
        };


        // Get request - get all tasks from db (to update local tasks array)
        var updateDataFromDB = function() {
            // Getting all the tasks
            tasks = window.localStorage.tasks ? JSON.parse(window.localStorage.tasks) : [];
        };



        // Initial
        updateDataFromDB();


        return {
            tasks: tasks,
            dbUpdateAll: dbUpdateAll,
            dbUpdate: dbUpdate,
            dbInsert: dbInsert,
            dbDelete: dbDelete,
            updateDataFromDB: updateDataFromDB,
            currentRequests: $http.pendingRequests
        };
}]);
