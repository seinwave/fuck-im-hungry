const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');

const welcome = agent => {
    // agent.consoleMessages.map(i => {
    //     agent.add(i.text); 
    // })
    agent.add(agent.consoleMessages[0].text); 
    agent.add(agent.consoleMessages[1].text); 
    agent.add(agent.consoleMessages[2].text); 
    agent.add(agent.consoleMessages[3].text); 
    agent.add(new Suggestion("Fuck, I'm hungry!"));
}


module.exports = {
    welcome
}