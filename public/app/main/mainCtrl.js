angular.module('skeleton').controller('mainCtrl', function ($scope, sCachedCourses) {
    $scope.courses = sCachedCourses.query();
});