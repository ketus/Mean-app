angular.module('skeleton').controller('navbarLoginCtrl',
    function ($scope, $http, Identity, Notifier, Auth, $location) {
    $scope.Identity = Identity;
    $scope.signIn = function (username, password) {

        Auth.authenticateUSer(username, password).then(function (success) {

            if (success) {
                Notifier.notify('Welcome back ' + Identity.currentUser.firstName + '!');
            } else {
                Notifier.notify('Wrong username or password.');
            }
        });
    };
        
    $scope.signOut = function () {

        Auth.logoutUser().then(function () {
            $scope.username = '';
            $scope.password = '';
            Notifier.notify('Till the next time, bye!');
            $location.path('/');
        });

    }
});
