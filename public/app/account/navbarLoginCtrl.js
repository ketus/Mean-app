angular.module('skeleton').controller('navbarLoginCtrl',
    function ($scope, $http, sIdentity, Notifier, sAuth, $location) {
    $scope.Identity = sIdentity;
    $scope.signIn = function (username, password) {

        sAuth.authenticateUSer(username, password).then(function (success) {

            if (success) {
                Notifier.notify('Welcome back ' + sIdentity.currentUser.firstName + '!');
            } else {
                Notifier.notify('Wrong username or password.');
            }
        });
    };
        
    $scope.signOut = function () {

        sAuth.logoutUser().then(function () {
            $scope.username = '';
            $scope.password = '';
            Notifier.notify('Till the next time, bye!');
            $location.path('/');
        });
    }
});
