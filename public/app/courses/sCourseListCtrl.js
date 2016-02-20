angular.module('skeleton').controller('sCourseListCtrl', function ( $scope, sCourse ) {
    $scope.courses = sCourse.query();

    $scope.sortOptions = [
        {value:'title', text: 'Sort by title'},
        {value: 'published', text: 'Sort by publish date'}
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
});