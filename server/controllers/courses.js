var Course = require('mongoose' ).model('Course');

module.exports.getCourses = function ( req, res ) {
    Course.find({}).exec( function ( err, collection ) {
        res.send(collection);
    });
};

module.exports.getCoursesById = function ( req, res ) {
    Course.findOne({ _id: req.params.id }).exec( function ( err, course) {
        res.send(course);
    });
};