var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express(),
    urlencodedParser = bodyParser.urlencoded({extended: false});
    
//For future functionality
function sendMessageToSlackResponseURL(responseURL, JSONmessage){
  var postOptions = {
    uri: responseURL,
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    json: JSONmessage;
  }
  request(postOPtions, (error, response, body) => {
    if(error){
      //Nothing here for now
    }
  }
}

app.post('/slack/actions', urlencodedParser, (req, res) =>{
  res.status(200).end();
  var actionJSONPayload = JSON.parse(req.body.payload);
  var message = {
    "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
    "replace_original": false;
  }
  //sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
}
