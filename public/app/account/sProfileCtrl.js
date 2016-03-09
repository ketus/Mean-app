angular.module('skeleton').controller('sProfileCtrl', function ($scope, sAuth, sIdentity, Notifier) {
    $scope.email = sIdentity.currentUser.username;
    $scope.fname = sIdentity.currentUser.firstName;
    $scope.lname = sIdentity.currentUser.lastName;
    
    $scope.update = function () {
        var userData = {
          username: $scope.email,
          firstName: $scope.fname,
          lastName: $scope.lname
        };

        if($scope.password && $scope.password.length > 0){
            userData.password = $scope.password;
        }

        sAuth.updateUserData(userData).then(function () {
            Notifier.notify('Your changes have been saved');
        }, function (reason) {
            Notifier.error(reason);
        });
    }
});