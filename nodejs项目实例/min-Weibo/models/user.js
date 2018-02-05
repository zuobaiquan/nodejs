var mongodb = require('./db.js')

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}
module.exports = User;

User.prototype.save = function(callback) {
    // body...
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    }
    console.log('save' + user.name)
    mongodb.open(function(err, db) {
        if (err) {
            mongodb.close();
            console.log('User open err')
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            console.log(err)

            if (err) {
                mongodb.close();
                return callback(err);
            }
            console.log('User open success')

            //为name属性添加索引
            var doc1 = user;
            collection.ensureIndex('name', { unique: true });
            //写入user文档
            collection.insert(doc1, { safe: true }, function(err, result) {
                mongodb.close();
                callback(err, user);
            });

        })
    })
};
User.get = function(username, callback) {
    // body...
    console.log("User.get:" + username);
    mongodb.open(function(err, db) {
        if (!err) {
            console.log("We are connected");
            db.collection('users', function(err, collection) {
                collection.find().toArray(function(error, users) {
                    console.log(users);
                });
                // collection.find({ a: 1 }).toArray(function(error, bars) { console.log(bars); });
                collection.findOne({ name: username }, function(error, doc) {
                    console.log('username' + doc);
                    if (doc) {
                        var user = new User(doc);
                        console.log("findOne:" + User);
                        console.log('mongodb closed')
                        mongodb.close();
                        return callback(err, user);
                    }
                    console.log('mongodb closed')
                    mongodb.close();
                    return callback(err, user);
                });
            });
        }
    });
};
User.getAll = function(callback) {
    // body...
    // console.log("User.get:" + username);
    mongodb.open(function(err, db) {
        if (!err) {
            console.log("We are connected");
            db.collection('users', function(err, collection) {
                collection.find().toArray(function(error, users) {
                    // console.log(users);
                    mongodb.close();
                    return callback(err, users);
                });
            });
        }
    });
};
