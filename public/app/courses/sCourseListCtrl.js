angular.module('skeleton').controller('sCourseListCtrl', function ( $scope, sCachedCourses ) {
    $scope.courses = sCachedCourses.query();

    $scope.sortOptions = [
        {value:'title', text: 'Sort by title'},
        {value: 'published', text: 'Sort by publish date'}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
});