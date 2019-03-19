var express = require('express'),
    mongo = require('mongojs'),
    bodyParser = require('body-parser');

var ObjectID = mongo.ObjectID;
var db = mongo('mongodb://localhost:27017/usr');
var app = express();
var port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/show', (req, res) => {
    var coll = db.collection('users')
    coll.find().toArray(function (err, docs) {
        res.send(docs);
    });
    
});
  
app.post('/api/register', (req, res) => {
    var coll = db.collection('users')
    coll.createIndex({ 'username': ""}, { unique: true });
    coll.insert({ 'username': req.body.user, 'password': req.body.pass }), function (err, result) {
        coll.find({ name: req.body.user }).toArray(function (err, docs) {
            console.log(docs[0]);
        });
    }
});
        app.listen(port, () => {
            console.log('Port listening at', port);
        });