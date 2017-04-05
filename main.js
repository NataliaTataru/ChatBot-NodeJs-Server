module.exports = {
    log: require('.//lib/log.js'),
    Wit: require('.//lib/wit.js'),
    interactive: require('.//lib/interactive.js')
};


'use strict';

let Wit = null;
let interactive = null;
const util = require('util');
const http = require('http');
const jQuery = require('jquery');
const $ = require('jquery');
var request = require('sync-request');
var globalContext = "";
const access_token = "55W6R2FIBKUUIUXQQ6DSOU7HDNZ2BVLB";


var express = require('express');
var app = express();



try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}



const accessToken = (() => {
//  if (process.argv.length !== 3) {
//    console.log('usage: node examples/quickstart.js 55W6R2FIBKUUIUXQQ6DSOU7HDNZ2BVLB');
//    process.exit(1);
//  }
  return "55W6R2FIBKUUIUXQQ6DSOU7HDNZ2BVLB";
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart




const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
    
    
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
  },
  
  getForecast({context, entities}) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      context.forecast = 'sunny in ' + location; // we should call a weather API here
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }
    return context;
  },
  
  
  getName({context,entities}) {
//      //name of the variable == name of the variable in wit.ai UI

 console.log("BAAAAAAA");

        var contact = firstEntityValue(entities, 'contact');
        console.log("CONTACT:   " + contact);
        var Javaresponse = "";
        var JavaMessage = "";

        var options = {
            host: 'localhost',
            port: 8080,
            path: '/RestTest/resources/messages',
           
        };
        var options2 = {
            
              host: 'localhost',
            port: 8080,
            path: '/RestTest/resources/messages',
        }
        var res = request('GET','http://localhost:8080/RestTest/resources/messages');
        console.log("*******************    "+res.getBody());
        
       
            
        JavaMessage = res.getBody();
        console.log("&&&&&& JAVA MESSAGE   " + JavaMessage);
        
        
        
         if (contact) {

                    context.Name = " " + res.getBody() + " " + contact;
                    globalContext += context;

                } else {
                    console.log("EROARE context");
                    context.Name = true;
                    delete context.Name;
                }
                
        return context;
  }
};

const client = new Wit({access_token, actions});


if (require.main === module) {
  console.log("Bot testing mode.");
  const client = new Wit({access_token, actions});
  interactive(client);
}
else{
interactive(client);
}
//var request = require('sync-request');

var port = 8001;
var app = express()



app.get('/converse', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var message = req.query.q;
  var sessionID = req.query.session_id;
  var response = request('POST', 'https://api.wit.ai/converse?q=' + message + '&session_id=' + sessionID, {
    'headers': {
      'Content-Type': 'application/json; charset=utf8',
      "Accept": "application/json",
      "Authorization": "Bearer 55W6R2FIBKUUIUXQQ6DSOU7HDNZ2BVLB"
    }
  });
  
  
   var apiResponse = JSON.parse(response.getBody('utf8'));
    if(apiResponse.type === "action"){
        console.log(apiResponse.action);
        if(apiResponse.action === "getName"){
            console.log('WAAAAAAAAAAAAAAAAAAAA');
            console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getName({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['Name']};
           res.send(response);
//actions.getName();
            
        }
    }  
else{
  res.send(JSON.parse(response.getBody('utf8')));
}
})
app.listen(1337);
