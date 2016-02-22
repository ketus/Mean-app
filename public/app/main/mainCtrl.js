angular.module('skeleton').controller('mainCtrl', function ($scope, sCourse) {
    $scope.courses = sCourse.query();
    $scope.testDate = new Date();
});