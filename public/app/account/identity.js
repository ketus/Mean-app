angular.module('skeleton').factory('Identity', function ($window, User) {
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = new User();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});

