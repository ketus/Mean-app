(function(){

var app = angular.module('skeleton', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mainCtrl'
        })
});

}());