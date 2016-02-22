var Course = require('mongoose' ).model('Course');

module.exports.getCourses = function ( req, res ) {
    Course.find({}).exec( function ( err, collection ) {
        res.send(collection);
    });
};