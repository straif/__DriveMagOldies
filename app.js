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
            .otherwise({redirectTo: '/main'});
    });
    
}());