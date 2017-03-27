(function(){
    
    var app = angular.module('DriveMagOldies', ['ngRoute']);
    
    app.config(function($routeProvider){
        $routeProvider
            .when('/main', {
                templateUrl: './templates/main.html',
                controller: 'MainController'
            })
            .when('/second', {
                templateUrl: './templates/second.html',
                controller: 'MainController'
            })
            //todo w. route params --- see comments down!!! ===============================
            .when('/ww/brand-01/current-model-01', {
                templateUrl: './templates/brands/brand-01/current-model-01.html',
                controller: 'MainController'
            })
            .when('/ww/brand-01/current-model-02', {
                templateUrl: './templates/brands/brand-01/current-model-02.html',
                controller: 'MainController'
            })
            .when('/ww/brand-01/current-model-03', {
                templateUrl: './templates/brands/brand-01/current-model-03.html',
                controller: 'MainController'
            })
            // ...
            //until route params, same for brand-02 ... 07 ================================
            //=============================================================================
            //todo w. route params --- see comments down!!! ===============================
            .when('/ww/car-file-01', {
                templateUrl: './templates/car-files/car-file-01.html',
                controller: 'MainController'
            })
            // ...
            //until route params, same for car-files-02 ... 07 ============================
            //=============================================================================
            //todo w. route params --- see comments down!!! ===============================
            .when('/ww/news-01', {
                templateUrl: './templates/news/news-01.html',
                controller: 'MainController'
            })
            // ...
            //until route params, same for car-files-02 ... 07 ============================
            .otherwise({redirectTo: '/main'});
    });
    
}());

/*
 * .when('/ww/:brand/:current-model', {
                templateUrl: './templates/brands/:brand/:current-model.html',
                controller: 'MainController'
            })
 */

/*
 * .when('/ww/:car-file', {
                templateUrl: './templates/car-files/:car-file.html',
                controller: 'MainController'
            })
 */

/*
 * .when('/ww/:news', {
                templateUrl: './templates/news/:news.html',
                controller: 'MainController'
            })
 */