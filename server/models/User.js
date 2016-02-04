/*
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    joined: Date
});

var User = mongoose.model('User', userSchema);

User.find({}, function (err, collection) {
    if(collection.length === 0){
        User.create({firstName:'Maciej', lastName:'Ketusiątko', userName:'Ketus', joined: new Date.now()});
        User.create({firstName:'Marcin', lastName:'Tob', userName:'Aldaron', joined: new Date.now()});
        User.create({firstName:'Aneta', lastName:'Gru', userName:'Antenka', joined: new Date.now()});

    }
});
*/
