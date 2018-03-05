var settings = require('../settings');
var mongo = require('mongodb');

var Server=mongo.Server;
var Db=mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db(settings.db, server);

var Connection = require('mongodb').Connection;

module.exports=db;
