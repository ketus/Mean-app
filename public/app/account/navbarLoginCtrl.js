angular.module('skeleton').controller('navbarLoginCtrl', function ($scope, $http) {

    $scope.signIn = function (username, password) {
        var headers={ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
        $http({
            url: '/login',
            method: 'POST',
            data: 'username='+username+'&password='+password,
            headers: headers
        }).then(function (res) {
                if(res.data.success) {
                    console.log('Logged in');
                } else {
                    console.log('error logging in');
                }
            })
    };

angular.module('skeleton').value();
    /* Same thing, works. Leaving if needed later
    $scope.signIn = function (username, password) {

        var headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
        $http.post('/login', 'username=' + username + '&password=' + password, {headers: headers})
            .then(function (res) {
                if(res.data.success) {
                    console.log('Logged in');
                } else {
                    console.log('error logging in');
                }
        });
    };*/

});