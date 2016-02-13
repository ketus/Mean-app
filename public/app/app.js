angular.module('skeleton', ['ngResource', 'ngRoute']);

angular.module('skeleton').config(function ($routeProvider, $locationProvider) {

    var routeRoleChecks = {
      admin: { auth: function (sAuth) {
        return sAuth.authorizeForRoute('admin')
      } }
    };
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'sUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'sSignupCtrl'
        })
});

angular.module('skeleton').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, curr, prev, rejection) {
        if(rejection === 'not authorized'){
            $location.path('/');
        }
    })
});