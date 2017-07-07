(function(){
    
    var app = angular.module('DriveMagOldies', ['ngRoute']);
    
    app.config(function($routeProvider){
        $routeProvider
            .when('/main', {
                templateUrl: './templates/main.html',
                controller: 'MainController'
            })
            .when('/ww/main', {
                templateUrl: './templates/main.html',
                controller: 'MainController'
            })
            .when('/ww/news', {
                templateUrl: './templates/news/allnews.html',
                controller: 'MainController'
            })
            .when('/ww/brands', {
                templateUrl: './templates/brands/allbrands.html',
                controller: 'MainController'
            })
            .when('/ww/car-files', {
                templateUrl: './templates/brands/carFiles.html',
                controller: 'MainController'
            })
            //LOGOS ==================================================================
            //todo w. route params --- see comments down!!! ===============================
            .when('/ww/brand-audi/current-model-audi', {
                templateUrl: './templates/brands/brand-audi/current-model-audi.html',
                controller: 'MainController'
            })
            .when('/ww/brand-alfa/current-model-alfa', {
                templateUrl: './templates/brands/brand-alfa/current-model-alfa.html',
                controller: 'MainController'
            })
            .when('/ww/brand-aston/current-model-aston', {
                templateUrl: './templates/brands/brand-aston/current-model-aston.html',
                controller: 'MainController'
            })
            .when('/ww/brand-benz/current-model-benz', {
                templateUrl: './templates/brands/brand-benz/current-model-benz.html',
                controller: 'MainController'
            })
            .when('/ww/brand-bmw/current-model-bmw', {
                templateUrl: './templates/brands/brand-bmw/current-model-bmw.html',
                controller: 'MainController'
            })
            .when('/ww/brand-bugatti/current-model-bugatti', {
                templateUrl: './templates/brands/brand-bugatti/current-model-bugatti.html',
                controller: 'MainController'
            })
            .when('/ww/brand-buick/current-model-buick', {
                templateUrl: './templates/brands/brand-buick/current-model-buick.html',
                controller: 'MainController'
            })
            .when('/ww/brand-cady/current-model-cady', {
                templateUrl: './templates/brands/brand-cady/current-model-cady.html',
                controller: 'MainController'
            })
            .when('/ww/brand-chevy/current-model-chevy', {
                templateUrl: './templates/brands/brand-chevy/current-model-chevy.html',
                controller: 'MainController'
            })
            .when('/ww/brand-fiat/current-model-fiat', {
                templateUrl: './templates/brands/brand-fiat/current-model-fiat.html',
                controller: 'MainController'
            })
            .when('/ww/brand-ford/current-model-ford', {
                templateUrl: './templates/brands/brand-ford/current-model-ford.html',
                controller: 'MainController'
            })
            .when('/ww/brand-gmc/current-model-gmc', {
                templateUrl: './templates/brands/brand-gmc/current-model-gmc.html',
                controller: 'MainController'
            })
            .when('/ww/brand-lancia/current-model-lancia', {
                templateUrl: './templates/brands/brand-lancia/current-model-lancia.html',
                controller: 'MainController'
            })
            .when('/ww/brand-peugeot/current-model-peugeot', {
                templateUrl: './templates/brands/brand-peugeot/current-model-peugeot.html',
                controller: 'MainController'
            })
            .when('/ww/brand-renault/current-model-renault', {
                templateUrl: './templates/brands/brand-renault/current-model-renault.html',
                controller: 'MainController'
            })
            .when('/ww/brand-rolls/current-model-rolls', {
                templateUrl: './templates/brands/brand-rolls/current-model-rolls.html',
                controller: 'MainController'
            })
            .when('/ww/brand-skoda/current-model-skoda', {
                templateUrl: './templates/brands/brand-skoda/current-model-skoda.html',
                controller: 'MainController'
            })
            .when('/ww/brand-vauxhall/current-model-vauxhall', {
                templateUrl: './templates/brands/brand-vauxhall/current-model-vauxhall.html',
                controller: 'MainController'
            })
            // ... dar vezi mai jos! la un moment dat sa folosest route params!
            //si sa faci controllere pt. fiecare
            //FELX-SLIDER ==================================================================
            .when('/ww/news/benz-velocipede', {
                templateUrl: './templates/news/benz-velocipede.html',
                controller: 'MainController'
            })
            .when('/ww/news/collectibles', {
                templateUrl: './templates/news/collectibles.html',
                controller: 'MainController'
            })
            .when('/ww/news/treasure', {
                templateUrl: './templates/news/rustingClassix.html',
                controller: 'MainController'
            })
            .when('/ww/news/expensive', {
                templateUrl: './templates/news/mostExpensiveOld.html',
                controller: 'MainController'
            })
            .when('/ww/news/armoured', {
                templateUrl: './templates/news/armouredRolls.html',
                controller: 'MainController'
            })
            .when('/ww/news/diesel', {
                templateUrl: './templates/news/diesel.html',
                controller: 'MainController'
            })
            .when('/ww/news/hybrid', {
                templateUrl: './templates/news/oldestHybrid.html',
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