const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));



// Saves user's craving level to MDB document
cravings = (agent) => {
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
        const craving = new Craving({ craving: degree, name: name, scoreBefore: score, scoreAfter: "", intervention: "", success: "", date: Date.now()})
        craving.save()
        }
    })
    agent.context.set('awaiting_readiness', 3)
    agent.add(agent.consoleMessages[0].text); 
    agent.add("Now let's get to work. We can try a few different techniques to prevent a bingefest. They each take about 15 minutes. Do you have time for that right now?")
    agent.add(new Suggestion('Yes.'));
    agent.add(new Suggestion('No.'));
};

module.exports = {
    cravings
}
