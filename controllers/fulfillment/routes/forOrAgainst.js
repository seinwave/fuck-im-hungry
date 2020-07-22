const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');

const forAgainst = agent => {
    agent.consoleMessages.map(i => {
        agent.add(i.text); 
    })
    agent.add(new Suggestion('For.'));
    agent.add(new Suggestion('Against.'));
}


module.exports = {
    forAgainst
}