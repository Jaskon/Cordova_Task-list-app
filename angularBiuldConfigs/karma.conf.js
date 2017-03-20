//jshint strict: false
module.exports = function(config) {
  config.set({

   
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-filter/dist/angular-filter.js',
      'app/app.module.js',
      'app/*!(.module|.spec).js',
      'app/myFilters/*.js',
      'app/tasksModel/*.js',
      'app/taskListComponent/*.module.js',
      'app/taskListComponent/*.component.js',
      'app/mainPageComponent/*.module.js',
      //'app/!(bower_components)/**/*!(.module|.spec).js',
      'app/**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
