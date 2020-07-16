const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

const cr = require('./cravings');
const ch = require('./theChoice');
const ep = require('./evaluationPost');
const st = require('./selfTalk')

const fulfillment = async (req, res) => {
    

    const agent = new WebhookClient({ request: req, response: res }, {useUnifiedTopology: true});

    let intentMap = new Map();
    intentMap.set('craving-moderate', cr.cravings);
    intentMap.set('craving-extreme', cr.cravings);
    intentMap.set('craving-mild', cr.cravings);
    intentMap.set('craving-strong', cr.cravings);
    intentMap.set('distraction-initialize', ch.theChoice);
    intentMap.set('procon-initialize', ch.theChoice);
    intentMap.set('selftalk-initialize', ch.theChoice);
    intentMap.set('surf-initialize', ch.theChoice);
    intentMap.set('evaluation-post', ep.evaluationPost);
    intentMap.set('selftalk-2', st.selfTalk)

    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
}