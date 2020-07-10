const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Event = mongoose.model('events');

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    console.log(request)

    function fallback(agent) {
        agent.add("Didn't catch that.")
    }

    function snoopy(agent) {
        console.log('You figured it out, borpo!', agent.parameters);

        agent.add("The Contract is Sealed")
    }

    function event(agent) {
        Event.findOne({'event': agent.parameters.event_name[0]}),
        function(err, course){
            const event = new Event({ event_name: agent.parameters.event_name[0],
            devangel_name: agent.paramenters.devangel_name[0]})
            event.save();
        }
    }

    let intentMap = new Map();
    intentMap.set('snoopy', snoopy);
    intentMap.set('event', event);
    intentMap.set('fallback', fallback);

    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
    
}