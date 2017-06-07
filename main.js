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
const ajax = require('ajax');
const $ = require('jquery');
var request = require('sync-request');
var globalContext = "";

var branch1 = 0;
var branch2 = 0;

var creditVal;


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
  if (process.argv.length !== 3) {
    console.log('usage: node examples/quickstart.js LXLEUXXD7MKAG3YGKXQOB2VUDCG3G44F');
    process.exit(1);
  }
  return process.argv[2];
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
  
  
  getValoareCreditSolicitata({context, entities}) {
      
       console.log("BAAAAAAA");
      
    var valoare_credit = firstEntityValue(entities, 'valoare_credit');
    console.log("VALOARE CREDIT-----");
    console.log(valoare_credit);
    
    creditVal = valoare_credit;
    
//    var valoare_venit = firstEntityValue(entities, 'venit_lunar');
    
    if(valoare_credit) {
        context.valoareCredit = "Ce venit lunar aveti [in RON]?";
        console.log("FOUND VALOARE CREDIT");
        console.log(valoare_credit);
    }
//    if(valoare_venit) {
//        context.valoareCredit = "Ce venit lunar aveti [in RON]?";
//        console.log("FOUND VALOARE VENIT");
//         console.log(valoare_venit);
//    }
    
    
    return context;
  },
  getOffers1({context, entities}) {
      
       console.log("OFFERS 1--------");
      
    var venit_lunar = firstEntityValue(entities, 'venit_lunar');
    console.log("VALOARE VENIT LUNAR-----");
    console.log(venit_lunar);
    console.log(context.quickreplies);
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(venit_lunar && creditVal) {
        console.log("Venit lunar si valoare credit solicitata:");
        console.log(venit_lunar);
        console.log(creditVal);
            context.valoareVenit = "Va pot sugera urmatoarele oferte..." + context.quickreplies;
    }
    
    
    return context;
  },
  
   getOffers2({context, entities}) {
      
       console.log("OFFERS 2--------");
      
    var venit_lunar2 = firstEntityValue(entities, 'venit_lunar2');
    console.log("VALOARE VENIT LUNAR-----");
    console.log(venit_lunar2);
    console.log(context.quickreplies);
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(venit_lunar2) {
        console.log("Venit lunar FARA valoare credit solicitata:");
        console.log(venit_lunar2);
       
            context.valoareVenit2 = "Va pot sugera urmatoarele oferte..." + context.quickreplies;
    }
    
    
    return context;
  },
  
  
   getOfertaAleasa({context, entities}) {
      
       console.log("OFERTA ALEASA--------");
      
    var numar_oferta = firstEntityValue(entities, 'numar_oferta');
    console.log("NUMAR OFERTA");
    console.log(numar_oferta);
   
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(numar_oferta) {
//        console.log("Venit lunar si valoare credit solicitata:");
        console.log(numar_oferta);
//        console.log(creditVal);
            context.numarOferta = "Ati ales " + numar_oferta;
    }
    
    
    return context;
  },
  
  
  
  getName({context,entities}) {
//      //name of the variable == name of the variable in wit.ai UI

 console.log("BAAAAAAA");
 
               //CALL EM
       
       var parseString = require('xml2js').parseString;

        
        var resDB = request('GET','http://localhost:8080/RestTest/resources/com.airhacks.chatrest.chatline/userId2/2');
        console.log("******************* DBBBBBB   "+resDB.getBody());
        var xml = resDB.getBody();
        parseString(xml, function (err, result) {
            console.log("PAAAAAAAAAARRRRRRRRSSSEEEED#############   ");
            //console.log(result);
            console.log("RASPUNSUL *********");
        console.dir(result);
        console.log("END RASPUNS *********");
        console.log("LUNGIME RASPUNS *********");
        console.log(result.chatLines.chatLine);
        //console.log(result['chatLines'].chatLine.object);
      //  var json = require('JSON').parse(result['chatLines'].chatLine.object);
        console.log("))))))))))))))))))))))))))");
        console.log(typeof(result));
        console.log("JSON STRINGIFIED &&&&&&&&&&&&&&");
        console.log(require('JSON').stringify(result));
        console.log("JSON STRINGIFIED &&&&&&&&&&&&&&");
});
        
        var jsdom = require("jsdom");

jsdom.env("", ["http://code.jquery.com/jquery.min.js"], function(err, window) {
    var $ = window.$
    $.support.cors = true;
        
        $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/RestTest/resources/com.airhacks.chatrest.chatuser',
    dataType: 'xml',
    success: function (response) {
        $('MobileConfiguration', response).each(function() {
            var id = $(this).find('Id').text();
            var key = $(this).find('Key').text();
            var value = $(this).find('Value').text();
            console.log("AAAAAAAAAAAAAAAAAAAAAAA");
            console.log(id, key, value);
        });
    },
    error: function (error) {
        console.log(error);
    }
});

});

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

                    context.Name = res.getBody() + " " + contact;
                    globalContext += context;

                } else {
                    console.log("EROARE context");
                    context.Name = true;
                    delete context.Name;
                }
                
        return context;
  }
};

const client = new Wit({accessToken, actions});



//var request = require('sync-request');

var port = 5000;
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
      "Authorization": "Bearer LXLEUXXD7MKAG3YGKXQOB2VUDCG3G44F"
    }
  });
  
  
   var apiResponse = JSON.parse(response.getBody('utf8'));
   
   console.log("API RESPONSE ----------");
    console.log(apiResponse);
    var intent = apiResponse.entities.intent;
    console.log("-----intent-----");
    console.log(intent[0].value);
    
    if(intent[0].value === "valoare_maxima_credit"){
        console.log("INTENT: valoare_maxima_credit");
       
       branch2 = 1;
       banch1 = 0;
    }
      if(intent[0].value === "new_credit"){
        console.log("INTENT: new_credit");
       
       branch2 = 0;
       banch1 = 1;
    }
    
    if(apiResponse.type === "action"){
        console.log(apiResponse.action);
        if(apiResponse.action === "getName"){
            console.log('WAAAAAAAAAAAAAAAAAAAA');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getName({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['Name']};
           res.send(response);
//actions.getName();
            
        }
        if(apiResponse.action === "getValoareCreditSolicitata"){
            console.log('WAAAAAAAAAAAAAAAAAAAA');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getValoareCreditSolicitata({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['valoareCredit']};
           res.send(response);
//actions.getName();
            
        }
        if(apiResponse.action === "getOffers1"){
            console.log('WAAAAAAAAAAAAAAAAAAAA');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffers1({context:{},entities: entitiesAction});
           console.log(botResponse);
           
//          
        
           
           
           response = {msg: botResponse['valoareVenit'], quickreplies: ["Oferta 1", "Oferta 2", "Oferta 3"], type:"msg"};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
//actions.getName();
            
        }
         if(apiResponse.action === "getOffers2"){
            console.log('WAAAAAAAAAAAAAAAAAAAA');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
            
           var botResponse = actions.getOffers2({context:{},entities: entitiesAction , quickreplies: ["Oferta 1", "Oferta 2", "Oferta 3"]});
           console.log(botResponse);
     
           response = {msg: botResponse['valoareVenit'], quickreplies: ["Oferta 1", "Oferta 2", "Oferta 3"], type:"msg"};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
//actions.getName();
            
        }
//        if(apiResponse.action === "getOfertaAleasa"){
//            console.log('API actiune: getOfertaAleasa');
//           // console.log(actions);
////            console.log(actions["getName"]["Function"]);
//            console.log(apiResponse.entities);
//            var entitiesAction = apiResponse.entities
//           var botResponse = actions.getOfertaAleasa({context:{},entities: entitiesAction});
//           console.log(botResponse);
//           response = {msg: botResponse['numarOferta']};
//           res.send(response);
////actions.getName();
//            
//        }
    }  
else

     if(intent[0].value === "selectare_oferta"){
        console.log("SELECTARE OFERTA");
        console.log('API actiune: getOfertaAleasa');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOfertaAleasa({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['numarOferta']};
           res.send(response);
        
    }
   
    else
    {
  res.send(JSON.parse(response.getBody('utf8')));
}





});
if (require.main === module) {
  console.log("Bot testing mode.");
  //const client = new Wit({accessToken, actions});
  //interactive(client);
}
else{
    console.log("Console mode");
interactive(client);
};
//app.listen(process.env.PORT || 5000);
////app.listen(1337);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});