const { WebhookClient } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

const cr = require('./routes/cravings');
const ch = require('./routes/theChoice');
const se = require('./routes/selection')
const ep = require('./routes/evaluationPost');
const we = require('./routes/welcome');
const st = require('./routes/selfTalk')
const fa = require('./routes/forOrAgainst');
const gr = require('./routes/genericReady');
const gd = require('./routes/genericDone');
const gy = require('./routes/genericYesNo');
const zt = require('./routes/zeroToTen');

const fulfillment = async (req, res) => {
    

    const agent = new WebhookClient({ request: req, response: res }, {useUnifiedTopology: true});

    let intentMap = new Map();
    
    
    // initialization / navigation routes
    intentMap.set('welcome', we.welcome);
    intentMap.set('craving-0', gy.yesNo);
    intentMap.set('craving--emotion5', zt.zeroToTen)
    intentMap.set('craving-moderate', cr.cravings);
    intentMap.set('craving-extreme4', cr.cravings);
    intentMap.set('craving-mild', cr.cravings);
    intentMap.set('craving-strong', cr.cravings);
    intentMap.set('choosing-technique', se.selection)
    intentMap.set('not-ready', gy.yesNo);

    // distraction routes
    intentMap.set('distraction-initialize', ch.theChoice);
    intentMap.set('distraction_chosen', gy.yesNo);
    intentMap.set('distraction-chosen-yes', gd.done);
    intentMap.set('distraction_ready-to-write', gd.done);

    //self-talk routes
    intentMap.set('selftalk-initialize', ch.theChoice);
    intentMap.set('selftalk-two', st.selfTalk);
    intentMap.set('selftalk-three', gd.done);
    intentMap.set('selftalk-four', gd.done);
    intentMap.set('selftalk-five', gd.done);
    intentMap.set('selftalk-six', gd.done);
    intentMap.set('selftalk-seven', gr.ready);

    //surfing routes
    intentMap.set('surf-initialize', ch.theChoice);
    intentMap.set('surf-explain', gy.yesNo);
    intentMap.set('surf-explain-yes', gy.yesNo);
    intentMap.set('surf-prepared', gy.yesNo);
    intentMap.set('surf-prepared-two', gd.done);
    intentMap.set('surf-emotion', gr.ready);
    intentMap.set('surf-prepared', gr.ready);

    // procon routes
    intentMap.set('procon-ready', gr.ready);
    intentMap.set('procon-writing', gd.done);
    intentMap.set('procon-initialize', ch.theChoice);
    intentMap.set('procon-task-done', fa.forAgainst);
    intentMap.set('procon-list-count-against', fa.forAgainst);
    intentMap.set('procon-list-count-for4', fa.forAgainst);
    intentMap.set('procon-list-count-against-pers-against', gr.ready);
    intentMap.set('procon-list-count-against-pers-for4', gr.ready);
    intentMap.set('procon-list-count-for-persuasion-for', gr.ready);
    intentMap.set('procon-list-count-for-persuasion-against', gr.ready);
    
    // evaluation routes
    intentMap.set('evaluation-pre', zt.zeroToTen)
    intentMap.set('evaluation-post', ep.evaluationPost);

    
    



    agent.handleRequest(intentMap)
}



module.exports = {
    fulfillment
}