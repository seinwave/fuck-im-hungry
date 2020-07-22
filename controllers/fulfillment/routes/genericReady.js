const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');

const ready = agent => {
    agent.consoleMessages.map(i => {
        agent.add(i.text); 
    })
    agent.add(new Suggestion('Ready'));
}


module.exports = {
    ready
}