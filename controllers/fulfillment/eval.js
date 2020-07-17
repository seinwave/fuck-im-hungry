const { WebhookClient } = require('dialogflow-fulfillment');

evaluation = (agent) => {

    agent.setFollowupEvent({
        "name" : "EVALUATION",
        "parameters" : {},
        "languageCode": 'en',
    },)
}

module.exports = {
    evaluation
}