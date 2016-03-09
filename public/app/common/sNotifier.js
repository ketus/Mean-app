angular.module('skeleton').value('Toastr', toastr);

angular.module('skeleton').factory('Notifier', function (Toastr) {
    return {
        notify: function (message) {
            Toastr.success(message);
            console.log(message);
        },
        error: function (reason) {
            Toastr.error(reason);
            console.log(reason);
        }
    }
});