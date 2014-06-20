var gcm = require('node-gcm');
var message = new gcm.Message();

//API Server Key
var sender = new gcm.Sender('AIzaSyCd2jjUvp4lhe3nf3Vu0KhuiP9KpPS5seg');
var registrationIds = [];

//Payload data to send...
message.addData('message', 'Testing Push Notifications!');
message.addData('title', 'Test');
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

// At least one reg id required
registrationIds.push('APA91bG91iuwZmLohj_GSKPUa9xxYtOkShTetieRzBxStFK1s0iaFDWLTLZoJw4neNzisJBOyNg8fh0_glR9T4qpp4c19ewa3Z-Ku_jmNWgLWmXzHjLk-PiewJp_UwwGqJB2j843TuQnqdFxsulGkUP0EpG1Ynf9hwEXPRHnlSv11jwIlpkziPk');

/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
  console.log(result);
});