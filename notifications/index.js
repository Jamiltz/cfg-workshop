var express       = require('express');
var logger        = require('morgan');
var errorhandler  = require('errorhandler');
var orchestrate   = require('orchestrate');
var bodyParser    = require('body-parser');
var gcm           = require('node-gcm');
var db            = require('orchestrate')(process.env.ORCHESTRATE_TOKEN || '8e5bf2a9-f805-4bd7-8e72-9c2d6c169705');

var sender      = new gcm.Sender(process.env.GCM_KEY || 'AIzaSyCd2jjUvp4lhe3nf3Vu0KhuiP9KpPS5seg');
var app         = express();
var COLLECTION  = 'users';

app.use(logger());
app.use(errorhandler());
app.use(bodyParser());

app.post('/signup', function(req, res, next) {

  var username        = req.body.username;
  var registrationId  = req.body.registration_id;

  if(!username || !registrationId || typeof(username) !== 'string' || typeof(registrationId) !== 'string') {
    return res.send(401, {error: 'ID not valid'});
  }

  db.put(COLLECTION, username, {registrationId: registrationId}, false)
    .then(function (result) {
      return res.send(201, {status: 'success'});
    })
    .fail(function (result) {
      return res.send(409, result.body);
    });
});

app.post('/send', function(req, res, next) {

  var username = req.body.username;

  if(!username || typeof(username) !== 'string') {
    return res.send(401, {error: 'ID not valid'});
  }

  db.get(COLLECTION, username)
    .then(function (user) {

      var message = new gcm.Message();

      //Payload data to send...
      message.addData('message', 'Testing Push Notifications!');
      message.addData('title', 'Test');
      message.addData('msgcnt','3'); // Shows up in the notification in the status bar
      message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
      //message.collapseKey = 'demo';
      //message.delayWhileIdle = true; //Default is false
      message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

      sender.send(message, [user.body.registrationId], 4, function (err, result) {
        if(err) {
          return res.send(500, err);
        }

        return res.send(result);
      });
    })
    .fail(function (result) {
      return res.send(404, result.body);
    });
});


var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listen on ' + port);