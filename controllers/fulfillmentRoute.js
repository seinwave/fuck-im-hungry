const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

const fulfillment = async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

     // Initializing new MongoDB cravingument; saving craving levels
    cravings = (agent) => { 
        let craving = nlp(agent.query);
        craving = parseInt(craving.numbers().toNumber().text());
        const craving = new Craving({ craving: agent.parameters.degree, name: agent.session, scoreBefore: craving, scoreAfter: "", intervention: "", date: Date.now()})
        craving.save()
        agent.context.set('awaiting_readiness', 3)
        agent.add(agent.consoleMessages[0].text); 
        agent.add("Now let's get to work. We can try a few different techniques to prevent a bingefest. They each take about 15 minutes. Do you have time for that right now?")
    }

    // Saving user's intervention choice
    theChoice = (agent) => {  
        
        let craving; 
        Craving.findOne({'name': agent.session }, function (err, craving) {
            if (err) {
                console.log(err)
            }
            let msg = agent.consoleMessages[0].text
            switch(msg) {
                case "Okay, great. Let's distract you from your craving for a little while.":
                    craving.intervention = "Distraction";
                    craving.save();
                    agent.context.set('awaiting_readiness_distraction', 3);
                    break;
                
                case "Great! Let's try some self-talk!":
                    craving.intervention = "Self-talk";
                    craving.save();
                    agent.context.set('awaiting_self_readiness', 3)
                    break;

                case "Okay! Let's try surfing the urge.":
                    craving.intervention = "Self-talk";
                    craving.save();
                    agent.context.set('surf-explain-yes', 3)
                    agent.context.set('surf-dont-explain-ready', 3)
                    break;

                case "Alright! Let's make a pro / con list.":
                    craving.intervention = "Pro / Con List";
                    craving.save();
                    agent.context.set('procon-ready', 3)
                    break;
            } // is undefined? for some reason?
        });

        


        agent.consoleMessages.map(i => {
            agent.add(i.text);
        })
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