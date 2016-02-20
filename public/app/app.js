angular.module('skeleton', ['ngResource', 'ngRoute']);

angular.module('skeleton').config(function ($routeProvider, $locationProvider) {

    var routeRoleChecks = {
      admin: { auth: function (sAuth) {
          return sAuth.authorizeForRoute('admin');
      }},
      user: { auth: function (sAuth) {
          return sAuth.authorizeAuthenticatedForRoute();
      }}  
        
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
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'sProfileCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/courses', {
            templateUrl: '/partials/courses/course-list',
            controller: 'sCourseListCtrl'
        })
});

angular.module('skeleton').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if(rejection === 'not authorized'){
            $location.path('/');
        }
    })
});