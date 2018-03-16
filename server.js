require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const slackEventsAPI = require('@slack/events-api');
const slackInteractiveMessages = require('@slack/interactive-messages');
const normalizePort = require('normalize-port');
var request = require('request')
var app = express()
var urlencodedParser = bodyParser.urlencoded({extended: false})

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}

app.post('/slack/actions', urlencodedParser, (req, res) =>{
    res.status(200).end()
    var reqBody = req.body
    var actionJSONPayload = JSON.parse(req.body.payload)
    var message = {
        "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
        "replace_original": false
    }
  sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
})

const port = normalizePort(process.env.PORT || '3000');
app.use(bodyParser.json());
//app.use('/slack/events', slackEvents.expressMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/slack/actions', slackMessages.expressMiddleware());

app.get('/', (req, res) => {
  res.send('<h2>The Announcements Approval app is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
