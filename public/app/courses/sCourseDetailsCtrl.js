angular.module('skeleton').controller('sCourseDetailsCtrl', function ( $scope, sCachedCourses, $routeParams ) {
    sCachedCourses.query().$promise.then( function ( collection ) {
        collection.forEach( function ( course ) {
            if(course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    })
});