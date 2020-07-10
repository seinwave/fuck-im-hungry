const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Event = mongoose.model('events');

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function snoopy(agent) {
        console.log('You figured it out, borpo!', agent.parameters);

        // Event.findOne({'event': agent.parameters.event[0]})

        agent.add("The Contract is Sealed")
    }

    function event(agent) {
        console.log('')
    }

    let intentMap = new Map();
    intentMap.set('snoopy', snoopy);
    intentMap.set('event', event)

    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment 
}