angular.module('skeleton').factory('Identity', function ($window, sUser) {
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = new sUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        }
    }
});

