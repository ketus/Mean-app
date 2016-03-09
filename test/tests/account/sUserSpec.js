describe('sUser', function () {
    beforeEach(module('skeleton'));

    describe('isAdmin', function () {
        it('Should return false if roles on user object doesn\'t have admin value', inject(function (sUser) {
            var user = new sUser();
            expect(user.isAdmin()).to.be.falsey;
        }))
    })
});