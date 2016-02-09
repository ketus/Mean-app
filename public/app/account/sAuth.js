angular.module('skeleton').factory('Auth', function ($http, Identity, $q, sUser) {
    return {
        authenticateUSer: function (username, password) {
            var dfd = $q.defer();
            var headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};

            $http({
                url: '/login',
                method: 'POST',
                data: 'username=' + username + '&password=' + password,
                headers: headers
            })
            .then(function (response) {
                if (response.data.success) {
                    var user = new sUser();
                    angular.extend(user, response.data.user);
                    Identity.currentUser = user;
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