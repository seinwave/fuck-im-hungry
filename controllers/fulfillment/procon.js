const { WebhookClient } = require('dialogflow-fulfillment');
const ev = require('./eval')
const eq = require('../event-query')

procon = (agent) => {

    
    agent.consoleMessages.map(i => {
         agent.add(i.text);        
    })
    
}

module.exports = {
    procon
}