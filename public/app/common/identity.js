angular.module('skeleton').factory('Identity',function ($window) {
    var currentUser = undefined;
    if(!!$window.bootstrappedUserObject){
        currentUser = $window.bootstrappedUserObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});

