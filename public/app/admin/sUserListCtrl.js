angular.module('skeleton').controller('sUserListCtrl', function ($scope, sUser) {
   $scope.users = sUser.query();
});