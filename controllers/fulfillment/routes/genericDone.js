const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');

const done = agent => {
    agent.consoleMessages.map(i => {
        agent.add(i.text); 
    })
    agent.add(new Suggestion('Done.'));
}


module.exports = {
    done
}