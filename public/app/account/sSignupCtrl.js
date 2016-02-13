angular.module('skeleton').controller('sSignupCtrl', function ($scope, sAuth, Notifier, $location, sAuth) {
    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        }

        sAuth.createUser(newUserData).then(function () {
            Notifier.notify('Your account created!');
            $location.path('/');
        }, function (reason) {
            Notifier.error(reason);
        })
    }
});