const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function cravings(agent){
        console.log("This is working", agent.parameters)
        const craving = new Craving({ craving: agent.parameters.degree, name: ''})
        craving.name = craving._id
        craving.save()
        agent.context.set('awaiting_readiness', 3)
        agent.add("Thanks a lot fuckboi");
        agent.add("Now let's get to work. We can try a few different techniques to prevent a bingefest. They each take about 15 minutes. Do you have time for that right now?")
    }

    let intentMap = new Map();
    intentMap.set('craving-moderate', cravings);
    intentMap.set('craving-extreme', cravings);
    intentMap.set('craving-mild', cravings);
    intentMap.set('craving-strong', cravings);

    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
    
}