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

var previousIntent;


//GLOBAL VARIABLES FOR DETERMINING DIALOGUE
var wantsMaximumLoan = false;
var wantsLoansInstallment = false;
var wantsNewCredit = false;
var howMuchVenit = false;
var whatIsVenit = false;
var wantsNoLoan = false;


var maxWithValCredit = false;
var loansWithValCredit = false;

var creditVal;

//GLOBAL VARS FOR ACTIONS - EXECUTED ONLY ONCE
var getOffersSumaVenit = false;
var getOffersWithoutVenit = false;
var venitLunarOptions = false;


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
    console.log('usage: node examples/quickstart.js H6C3KOBY4KAGASXHC54VLSC3YMKLUFH3');
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
  
  venitLunarOptions({context, entities}) {
      
       console.log("venitLunarOptions");
     
    
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
  
  // new_bot2
  
  
     getOffersWithoutVenit({context, entities}) {
      
       console.log("getOffersWithoutVenit");
      
    var valoare_credit = firstEntityValue(entities, 'valoare_credit');
    console.log("VALOARE CREDIT FARA VENIT-----");
    console.log(valoare_credit);
    //console.log(context.quickreplies);
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(valoare_credit) {
        console.log("Valoare credit:");
        console.log(valoare_credit);

         var res = request('GET','http://localhost:8080/RestTest/resources/messages/getOffersUnknownIncome/' + valoare_credit);
        console.log("*******************    "+res.getBody());
        
        
        context.valoare_credit = res.getBody().toString();
        
      console.log(context.valoare_credit);
        
    }
    
    
    return context;
  },
  
  
   getOffersMaximumLoan({context, entities}) {
      
       console.log("getOffersMaximumLoan");
      
    if(maxWithValCredit){
        var valoare_venit_lunar = firstEntityValue(entities, 'valoare_credit');
    }  
    else{
         var valoare_venit_lunar = firstEntityValue(entities, 'valoare_venit_lunar');
    }
   
    console.log("VALOARE VENIT LUNAR FOR MAXIMUM-----");
    console.log(valoare_venit_lunar);
    //console.log(context.quickreplies);
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(valoare_venit_lunar) {
        console.log("Venit lunar pentru maxim:");
        console.log(valoare_venit_lunar);



        var res = request('GET','http://localhost:8080/RestTest/resources/messages/getOfferForMaximumLoan/' + valoare_venit_lunar);
        console.log("*******************    "+res.getBody());
        
        
        context.valoare_venit_lunar = res.getBody().toString();
        
      console.log(context.valoare_venit_lunar);
           
    }
    
    
    return context;
  },
   getOffersLoansInstallments({context, entities}) {
      
       console.log("getOffersLoansInstallments");
      
      if(loansWithValCredit){
          console.log(entities);
          var valoare_venit_lunar = firstEntityValue(entities, 'valoare_credit');
      }
      else
      {
          console.log(entities);
          var valoare_venit_lunar = firstEntityValue(entities, 'valoare_venit_lunar');
      }
    
    console.log("VALOARE VENIT LUNAR-----");
    console.log(valoare_venit_lunar);
    //console.log(context.quickreplies);
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(valoare_venit_lunar) {
        var res = request('GET','http://localhost:8080/RestTest/resources/messages/getOffersForLoanInstallments/' + valoare_venit_lunar);
        console.log("*******************    "+res.getBody());
        
        
        context.valoare_venit_lunar = res.getBody().toString();
        
      console.log(context.valoare_venit_lunar);
    }
    
    
    return context;
  },
  
  //new_bot2
     getSelectedOffer({context, entities}) {
      
       console.log("OFERTA ALEASA--------");
      
    var selected_offer = firstEntityValue(entities, 'selected_offer');
    console.log("NUMAR OFERTA");
    console.log(selected_offer);
   
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());
           
           
    
    if(selected_offer) {
//        console.log("Venit lunar si valoare credit solicitata:");
        console.log(selected_offer);
//        console.log(creditVal);
            context.selected_offer = "Ati ales " + selected_offer;
    }
    
    
    return context;
  },
  
  
    getOffersSumaVenit({context, entities}) {
      
       console.log("getOffersSumaVenit");
       
       
    getOffersSumaVenit = true;
      
    var valoare_credit = firstEntityValue(entities, 'valoare_credit');
    var valoare_venit_lunar = firstEntityValue(entities, 'valoare_venit_lunar');
    
    console.log("VALOARE VENIT LUNAR SI VALOARE CREDIT-----");
    console.log(valoare_credit);
    console.log(valoare_venit_lunar);
    
//    var response = request('POST','http://127.0.0.1:5000/converse?session_id=123');
//        console.log("*******************    "+response.getBody());

    if(valoare_credit && valoare_venit_lunar) {
        console.log("Venit lunar si valoare credit solicitata:");
        console.log(valoare_venit_lunar);
        console.log(valoare_credit);
            context.valoare_venit_lunar = valoare_venit_lunar;
            context.valoare_credit = valoare_credit;
            
            //APEL API CU SUMA CREDIT SI VENIT LUNAR
            
        
          var values = {
                'suma_credit':valoare_credit ,
                'venit_lunar': valoare_venit_lunar
                
            };
//        var jsdom = require("jsdom");
//var jsdom;
//try {
//  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
//} catch (e) {
//  jsdom = require("jsdom"); // jsdom <= 9.x
//}

console.log("SENDING JSON:");
console.log(require('JSON').stringify(values));

//jsdom.env("", ["http://code.jquery.com/jquery.min.js"], function(err, window) {
//    var $ = window.$
//    $.support.cors = true;
//    $.ajax({
//                url: 'http://localhost:8080/RestTest/resources/messages/getOfferForSumaAndVenit2/' + valoare_credit +"/" + valoare_venit_lunar,
//               
//                dataType : "text",
//               
//                type: 'GET',
//                crossDomain: true,
//                success: function (response) {
//                    console.log("GET OFFER API ____________");
//                    console.log(response);
//
//                },
//                error:function(){
//                    console.log("NUUUUUUUUUUUUUUUUUUU");
//                }
//            });
//    
//});

 var res = request('GET','http://localhost:8080/RestTest/resources/messages/getOfferForSumaAndVenit2/' + valoare_credit +"/" + valoare_venit_lunar);
        console.log("*******************    "+res.getBody());
        
        
        context.valoare_venit_lunar = res.getBody().toString();
        
      console.log(context.valoare_venit_lunar);
            
    }
  
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



app.get('/samples', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var data = [{
                    "text": "venitul meu este de 3400 RON",
                    "entities": [
                        {"entity": "intent",
                            "value": "get_venit_lunar"},
                        {"entity": "valoare_venit_lunar",
                            "start": 21,
                            "end": 25,
                            "value": "3400"}],
                }];
 
  var response = request('POST', 'https://api.wit.ai/samples?v=20170307', {
    'json':
        data
    ,
      'headers': {
      'Content-Type': 'application/json; charset=utf8',
      "Accept": "application/json",
      "Authorization": "Bearer H6C3KOBY4KAGASXHC54VLSC3YMKLUFH3"
    }
  });
  
  var apiResponseTrain = JSON.parse(response.getBody('utf8'));
   
   console.log("API RESPONSE TRAIN----------");
    console.log(apiResponseTrain);
});




app.get('/converse', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var message = req.query.q;
  var sessionID = req.query.session_id;
  var response = request('POST', 'https://api.wit.ai/converse?q=' + message + '&session_id=' + sessionID, {
    'headers': {
      'Content-Type': 'application/json; charset=utf8',
      "Accept": "application/json",
      "Authorization": "Bearer H6C3KOBY4KAGASXHC54VLSC3YMKLUFH3"
    }
  });
  
  
   var apiResponse = JSON.parse(response.getBody('utf8'));
   
   console.log("API RESPONSE ----------");
    console.log(apiResponse);
    
    console.log("Previous intent -------");
    console.log(previousIntent);
    
    var savedPrevIntent = previousIntent;
    
    var intent = apiResponse.entities.intent;
   
    
    var intentPresent = false;
    
    
    if(intent == undefined || intent == 'undefined' || intent == null || intent == ''){
        
        console.log("Intent undefined");
        console.log(intent);
        
        if(intent == "maximul_value_of_a_loan"){
            
        console.log("identified intent: maximul_value_of_a_loan");
        if(apiResponse.entities.valoare_credit != 'undefined'){
             console.log('getOffersMaximumLoan cu valoare_credit');
             maxWithValCredit = true;
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
            
           var botResponse = actions.getOffersMaximumLoan({context:{},entities: entitiesAction});
           console.log(botResponse);
     
           response = {msg: botResponse['valoare_venit_lunar']};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
            
        }
    }
    
     if(intent == "buy_installments"){
         
         console.log("identified intent: buy_installments");
        
        if(apiResponse.entities.valoare_credit != 'undefined'){
             console.log('getOffertsLoansInstallments cu valoare_credit');
             loansWithValCredit = true;
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
            
           var botResponse = actions.getOffersLoansInstallments({context:{},entities: entitiesAction});
           console.log(botResponse);
     
           response = {msg: botResponse['valoare_venit_lunar']};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
            
        }
    }
    
    
    }
//    else
//         
//    if(apiResponse.type === "stop"){
//        
//        console.log("STOP --- hammer time");
//        response = {msg: "Imi pare rau dar nu am inteles. Inca invat."};
//           res.send(response);
//        
//    }
    
    
    
    if(intent != undefined && intent != 'undefined' && intent != null && intent != ''){
    console.log("-----intent-----");
    console.log(intent[0].value);
    
    
    previousIntent = intent[0].value;
    
    intentPresent = true;
}

   
    
    
    if(apiResponse.type === "action"){
        console.log("RESPONSA TYPE IS ACTION:");
        console.log(apiResponse.action);
        
        console.log("Actual previous intent:");
        console.log(savedPrevIntent);
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
        if(apiResponse.action === "venitLunarOptions"){
            console.log('venitLunarOptions');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
//            
           var botResponse = actions.venitLunarOptions({context:{},entities: entitiesAction});
           console.log(botResponse);
     
           response = {msg: "Spuneti-mi la ce suma va ganditi [in RON] si pe baza acesteia va pot prezenta posibilitatile noastre de creditare."};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
//actions.getName();
            
        }
        
        if(apiResponse.action === "getOffersWithoutVenit"){
            console.log('getOffersWithoutVenit');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersWithoutVenit({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['valoare_credit']};
           res.send(response);
//actions.getName();
            
        }
        
        if(apiResponse.action === "getOffersSumaVenit"){
            console.log('getOffersSumaVenit');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersSumaVenit({context:{},entities: entitiesAction});
           console.log(botResponse);
           
//          
        
           
           
           response = {msg: botResponse['valoare_venit_lunar']};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
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
          if(intentPresent && intent[0].value === "get_venit_lunar" && previousIntent === "maximul_value_of_a_loan"){
        console.log("Previous intent is : maximul_value_of_a_loan");
       console.log('execute getOffersMaximumLoan');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersMaximumLoan({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['valoare_venit_lunar']};
           res.send(response);
        
    }
        if(apiResponse.action === "getOffersLoansInstallments" && savedPrevIntent !== "maximul_value_of_a_loan" ){
            console.log('got action: getOffersLoansInstallments');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
            
           var botResponse = actions.getOffersLoansInstallments({context:{},entities: entitiesAction});
           console.log(botResponse);
     
           response = {msg: botResponse['valoare_venit_lunar']};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
//actions.getName();
            
        }if(apiResponse.action === "getOffersMaximumLoan"){
            console.log('getOffersMaximumLoan');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
            
           var botResponse = actions.getOffersMaximumLoan({context:{},entities: entitiesAction});
           console.log(botResponse);
     
           response = {msg: botResponse['valoare_venit_lunar']};
//           response.quickreplies.map(x => {"title": x, "content_type": "text", "payload": "empty"});
           res.send(response);
//actions.getName();
            
        }
        
        
        if(apiResponse.action === "getSelectedOffer"){
            console.log('getSelectedOffer');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
            
           var botResponse = actions.getSelectedOffer({context:{},entities: entitiesAction});
           console.log(botResponse);
     
           response = {msg:botResponse['selected_offer'], type:"stop"};
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
    if(!intentPresent){
        console.log("UNEXISTING INTENT");
        console.log("send generic message for absent intent");
 
           response = {msg:"Imi pare rau dar nu am inteles. Va rog sa repetati."};
           res.send(response);
    }
    if(intentPresent && intent[0].value === "maximum_value_of_a_loan" && (apiResponse.entities.valoare_credit == undefined || apiResponse.entities.valoare_credit == 'undefined' || apiResponse.entities.valoare_credit == null || apiResponse.entities.valoare_credit == '')){
        
         console.log("INTENT EAS :::::: maximum_value_of_a_loan");
        console.log("getOffersMaximumLoan");
        console.log('API actiune: getOffersMaximumLoan');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersMaximumLoan({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg:botResponse['valoare_venit_lunar']};
           res.send(response);
        
    }
    
    if(savedPrevIntent === "venit_lunar_options" && intent[0].value === "get_valoare_credit"){
        console.log("Previous intent is : venit_lunar_options");
       console.log('execute getOffersWithoutVenit');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersWithoutVenit({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['valoare_credit']};
           res.send(response);
        
    }
    
     if(intentPresent && intent[0].value === "get_venit_lunar" && previousIntent === "maximul_value_of_a_loan"){
        console.log("Previous intent is : maximul_value_of_a_loan");
       console.log('execute getOffersMaximumLoan');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersMaximumLoan({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['valoare_venit_lunar']};
           res.send(response);
        
    }
    if(intentPresent && intent[0].value === "get_venit_lunar" && previousIntent === "explain_venit_lunar"){
        
        console.log("INTENT EAS :::::: get_venit_lunar");
        console.log("getOffersLoansInstallments");
        console.log('API actiune: getOffersLoansInstallments');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersLoansInstallments({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg:botResponse['valoare_venit_lunar']};
           res.send(response);
        
    }
    if(intentPresent && intent[0].value === "get_venit_lunar" && previousIntent === "maximum_value_of_a_loan"){
        
        console.log("INTENT EAS :::::: get_venit_lunar");
        console.log("getOffersMaximumLoan");
        console.log('API actiune: getOffersMaximumLoan');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersMaximumLoan({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg:botResponse['valoare_venit_lunar']};
           res.send(response);
        
    }
   else
     if(intentPresent && intent[0].value === "selectare_oferta"){
        console.log("SELECTARE OFERTA");
        console.log('API actiune: getOfertaAleasa');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOfertaAleasa({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: "Ati ales " + botResponse['numarOferta']};
           res.send(response);
        
    }
else
if(intentPresent && intent[0].value === "get_valoare_credit"){
        console.log("Get valoare credit fara venit");
        console.log('API actiune: getOffersWithoutVenit');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersWithoutVenit({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['valoare_credit']};
           res.send(response);
        
    }
   else
if(intentPresent && intent[0].value === "select_offer"){
        console.log("SELECTARE OFERTA");
        console.log('API actiune: getSelectedOffer');
           // console.log(actions);
//            console.log(actions["getName"]["Function"]);
            console.log(apiResponse.entities);
            var entitiesAction = apiResponse.entities
           var botResponse = actions.getSelectedOffer({context:{},entities: entitiesAction});
           console.log(botResponse);
           response = {msg: botResponse['selected_offer']};
           res.send(response);
        
    }
else
if(intentPresent && intent[0].value === "explain_venit_lunar"){
        console.log("EXPLAIN VENIT LUNAR");

            console.log(apiResponse.entities);
           
           response = {msg: "In venitul lunar trebuie sa cumulati toate sursele dvs. de venit [salariu, chirii etc. in echivalent RON]"};
           res.send(response);
        
    }
else
//if(intentPresent && intent[0].value === "new_credit"){
//        console.log("NEW CREDIT");
//
//            console.log(apiResponse.entities);
//           
//           response = {msg: "Sigur ca da. La ce suma va ganditi si ce venit lunar aveti? [in RON] "};
//           res.send(response);
//        
//    }else
if(intentPresent && intent[0].value === "venit_lunar_options"){
        console.log("OFERTE FARA VENIT LUNAR");

            console.log(apiResponse.entities);
       
           var entitiesAction = apiResponse.entities
           var botResponse = actions.venitLunarOptions({context:{},entities: entitiesAction});
           
           response = {msg: "Spuneti-mi la ce suma va ganditi [in RON] si pe baza acesteia va pot prezenta posibilitatile noastre de creditare."};
           res.send(response);
        
    }

if(intentPresent && intent[0].value === "get_offers_suma&venit"){
        console.log("OFERTE CU VENIT LUNAR SI SUMA CREDIT");

            console.log(apiResponse.entities);
       
           var entitiesAction = apiResponse.entities
           var botResponse = actions.getOffersSumaVenit({context:{},entities: entitiesAction});
           
           response = {msg: botResponse['valoare_venit_lunar']};
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