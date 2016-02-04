angular.module('skeleton').controller('navbarLoginCtrl', function ($scope, $http) {
    $scope.signin = function (username, password) {
        $http.post('/login', {username: username, password: password})
            .then(function (res) {
                if(res.data.success) {
                    console.log('Logged in');
                } else {
                    console.log('error logging in');
                }
            })
    };
});