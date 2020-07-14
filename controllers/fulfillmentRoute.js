const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

const fulfillment = async (req, res) => {
    

    const agent = new WebhookClient({ request: req, response: res, useUnifiedTopology: true });
    
     // Initializing new MongoDB document; saving craving levels
    cravings = (agent) => {
        // Checking for existing doc
        let name = agent.session.trimEnd();
        let score = nlp(agent.query);
        score = parseInt(score.numbers().toNumber().text());
        let degree = agent.parameters.degreee;

        Craving.findOne({'name': name }, function (err, doc) {
            if (err) {
                console.log(err)
                agent.add("So sorry, something went wrong on my end. Could you try again?");
            }

            else if (doc != null){
                doc.scoreBefore = score;
                doc.degree = degree;
                doc.date = Date.now();
                doc.save();
            }

            else {
            const craving = new Craving({ craving: degree, name: name, scoreBefore: score, scoreAfter: "", intervention: "", date: Date.now()})
            craving.save()
            }
        })
        agent.context.set('awaiting_readiness', 3)
        agent.add(agent.consoleMessages[0].text); 
        agent.add("Now let's get to work. We can try a few different techniques to prevent a bingefest. They each take about 15 minutes. Do you have time for that right now?")
    };

    // Saving user's intervention choice
    theChoice = (agent) => {  
        
        let name = agent.session.trimEnd();
        let msg = agent.consoleMessages[0].text
        
        Craving.findOne({'name': name }, function (err, doc) {
            if (err) {
                console.log(err)
                agent.add("So sorry, something went wrong on my end. Could you try again?");
            }

            switch(msg) {
                default:
                    doc.intervention = "Fuckleberry";
                    agent.context.set('awaiting_readiness_distraction', 3);
                    break;
                    
                case 'Okay, great. Let\'s distract you from your craving for a little while.':
                    doc.intervention = "Distraction";
                    agent.context.set('awaiting_readiness_distraction', 3);
                    break;
                
                case 'Great! Let\'s try some self-talk!':
                    doc.intervention = "Self-talk";
                    agent.context.set('awaiting_self_readiness', 3)
                    break;
    
                case 'Okay! Let\'s try surfing the urge.':
                    doc.intervention = "Self-talk";
                    agent.context.set('surf-explain-yes', 3)
                    agent.context.set('surf-dont-explain-ready', 3)
                    break;
    
                case 'Alright! Let\'s make a pro / con list.':
                    doc.intervention = "Pro / Con List";
                    agent.context.set('procon-ready', 3)
                    break;
            }

            doc.date = Date.now();
            return doc.save();
        });

        agent.consoleMessages.map(i => {
            agent.add(i.text);

            
        })
        
    };

    comparator = (agent, doc) => {
        console.log("comparator is firing")
        if (doc.scoreBefore > doc.scoreAfter) {
            agent.add("Great success high five!")
        }
        else {
            agent.add("Boo hoo ya dummy.")
        }
    }

    evaluationPost = (agent) => {
        let name = agent.session.trimEnd();
        let scoreAfter = nlp(agent.query);
        scoreAfter = parseInt(scoreAfter.numbers().toNumber().text());

        Craving.findOne({'name': name }, function (err, doc) {
            if (err) {
                console.log(err)
            }
            else if (doc != null) {

                doc.scoreAfter = scoreAfter;
                doc.save();
            }

            return comparator(agent, doc);
        });
    };

    let intentMap = new Map();
    intentMap.set('craving-moderate', cravings);
    intentMap.set('craving-extreme', cravings);
    intentMap.set('craving-mild', cravings);
    intentMap.set('craving-strong', cravings);
    intentMap.set('distraction-initialize', theChoice);
    intentMap.set('procon-initialize', theChoice);
    intentMap.set('selftalk-initialize', theChoice);
    intentMap.set('surf-initialize', theChoice);
    intentMap.set('evaluation-post', evaluationPost);


    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
    
}