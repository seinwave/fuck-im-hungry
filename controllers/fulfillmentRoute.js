const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function snoopy(agent) {
        console.log('You figured it out, borpo!', agent.parameters);

        agent.add("The Contract is Sealed")
    }

    function cravings(agent){
        console.log("This is working", agent)
        const craving = new Craving({ craving: agent.parameters.degree}) 
        craving.save()
        agent.QueryResult.output_contexts = ["awaiting_readiness"]
        agent.add("Thanks a lot fuckboi");
        agent.add("Now let's get to work. We can try a few different techniques to prevent a bingefest. They each take about 15 minutes. Do you have time for that right now?")
    }

    // function event(agent) {

    //     console.log(agent.response);
    //     agent.add("Tell me the name of the event.")
    //     Event.findOne({'event': agent.parameters.event_name[0]}),
    //     function(err, course){
    //         const event = new Event({ event_name: agent.parameters.event_name[0],
    //         devangel_name: agent.paramenters.devangel_name[0]})
    //         event.save();
    //     }
    // }

    let intentMap = new Map();
    intentMap.set('snoopy', snoopy);
    intentMap.set('craving-moderate', cravings);
    intentMap.set('craving-extreme', cravings);
    intentMap.set('craving-mild', cravings);
    intentMap.set('craving-strong', cravings);

    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
    
}