var app = angular.module('skeleton', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
                     templateUrl: '/partials/main',
                     controller: 'MainController'
                   });
});

app.controller('MainController', function ($scope) {
    $scope.test = 'Hi Angular';
});


/*angular.module('skeleton', ['ngResource', 'ngRoute']);

angular.module('skeleton').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});
});

angular.module('skeleton').controller('mainCtrl', function($scope){
    $scope.test = "Hello Angular";
});*/