angular.module('skeleton').factory('sCachedCourses', function ( sCourse ) {
    var courseList;
    
    return {
        query: function (  ) {
            if(!courseList) {
                courseList = sCourse.query();
            }
            return courseList;
        }
    }
});