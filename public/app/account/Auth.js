angular.module('skeleton').factory('Auth', function ($http, Identity, $q) {
    return {
        authenticateUSer: function (username, password) {
            var dfd = $q.defer();
            var headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
            $http({
                url: '/login',
                method: 'POST',
                data: 'username=' + username + '&password=' + password,
                headers: headers
            }).then(function (res) {
                if (res.data.success) {
                    Identity.currentUser = res.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                Identity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }
    }
});