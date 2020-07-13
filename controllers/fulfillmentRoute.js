const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

     // Initializing new MongoDB document; saving craving levels
    cravings = (agent) => { 
        let doc = nlp(agent.query);
        doc = parseInt(doc.numbers().toNumber().text());
        const craving = new Craving({ craving: agent.parameters.degree, name: agent.session, scoreBefore: doc, scoreAfter: "", intervention: "", date: Date.now()})
        craving.save()
        agent.context.set('awaiting_readiness', 3)
        agent.add(agent.consoleMessages[0].text); 
        agent.add("Now let's get to work. We can try a few different techniques to prevent a bingefest. They each take about 15 minutes. Do you have time for that right now?")
    }

    // Saving user's intervention choice
    theChoice = (agent) => {  
        console.log(agent);
        let doc = Craving.findOne({'name': agent.session });
        console.log("The doc is", doc);

        agent.add(agent.consoleMessages[0].text);
    }

    let intentMap = new Map();
    intentMap.set('craving-moderate', cravings);
    intentMap.set('craving-extreme', cravings);
    intentMap.set('craving-mild', cravings);
    intentMap.set('craving-strong', cravings);
    intentMap.set('distraction-initialize', theChoice)
    intentMap.set('procon-initialize', theChoice)
    intentMap.set('selftalk-initialize', theChoice)
    intentMap.set('surf-initialize', theChoice)


    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
    
}