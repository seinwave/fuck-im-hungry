const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Event = mongoose.model('events');
const Craving = mongoose.model('cravings')

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function snoopy(agent) {
        console.log('You figured it out, borpo!', agent.parameters);

        agent.add("The Contract is Sealed")
    }

    function cravings(agent){

        Craving.findOne({ 'degree' : agent.parameters.degree[0] }),
        function(err, degree){
            const craving = new Craving({ degree: agent.parameters.degree[0]}) 
            craving.save()
        }
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
    intentMap.set('craving-moderate', craving);

    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
    
}