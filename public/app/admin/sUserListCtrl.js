angular.module('skeleton').controller('sUserListCtrl', function ($scope, sIdentity) {
   $scope.users = sIdentity.query();
});