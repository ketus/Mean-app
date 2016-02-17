angular.module('skeleton').factory('sAuth', function ($http, sIdentity, $q, sUser) {
    var headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
    return {
        authenticateUSer: function (username, password) {
            var dfd = $q.defer();

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
                    sIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser: function (newUserData) {
            var newUser = new sUser(newUserData);
            console.log(newUser);
            var dfd = $q.defer();

            $http({
                url: '/api/users',
                method: 'POST',
                data:   'username=' + newUser.username + '&password=' + newUser.password +
                        '&firstname=' + newUser.firstName + '&lastName=' + newUser.lastName,
                headers: headers
            }).then(function () {
                sIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (res) {
                dfd.reject(res.data.reason);
            })



            /*newUser.$save().then(function () {
                sIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (res) {
               dfd.reject(res.data.reason);
            });*/
            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                sIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeForRoute: function (role) {
            if(sIdentity.isAuthorized(role)){
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

    }
});