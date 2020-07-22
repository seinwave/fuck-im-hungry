const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const mongoose = require('mongoose');
const Craving = mongoose.model('cravings')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));


// Evaluates how well the intervention worked for the user
evaluationPost = async (agent) => {
    let name = agent.session.trimEnd();
    let scoreAfter = nlp(agent.query);
    scoreAfter = parseInt(scoreAfter.numbers().toNumber().text());


    //executing a mongoose query
    let preScoreObj = await Craving.findOne({'name': name }, 'scoreBefore').exec();
    // Accessing the results of the query
    let preScore = preScoreObj.scoreBefore;

    let interventionObj = await Craving.findOne({'name': name }, 'intervention').exec();
    let intervention = interventionObj.intervention;

    Craving.findOne({'name': name }, function (err, doc) {
        if (err) {
            console.log(err)
        }
        
        if (doc != null) {
            doc.scoreAfter = scoreAfter;
            if (doc.scoreBefore > doc.scoreAfter){
                doc.success = "Yes"
            }
            else if (doc.scoreAfter > doc.scoreBefore){
                doc.success = "No"
            }

            doc.save();
        };

    });
    
    if (preScore > scoreAfter && preScore - scoreAfter >=3) {
        agent.add("Excellent! That's a significant drop!")

        switch(intervention){
            default:
                agent.add("Nothing works, Matt.")
                break;
            case "distraction":
                agent.add("Looks like distracting yourself is a great tactic for you!")
                agent.add("The great thing about it is, the more you practice distracting yourself, the weaker your cravings are going to get.")
                agent.add("So keep it up! You can do it on your own, or with my help if you want!")
                agent.add("Now, you've had some success here. But do you want to try another exercise?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "self-talk":
                agent.add("Self-talk seems to work for you!")
                agent.add("Self-talk is wonderful because you can do it anywhere, any time.")
                agent.add("We practiced saying your self-talk out-loud, but it works just as well if you do it in your head.")
                agent.add("So feel free to try it whenever — and wherever — your urges strike! With or without my help!")
                agent.add("Now, you've had some success here. But do you want to try another exercise?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "surfing":
                agent.add("Surfing seems like a good fit for you!")
                agent.add("Urge surfing is so powerful because it totally reframes your relationship with your cravings.")
                agent.add("Instead of living 'in' your cravings, you learn to separate yourself from them. You can watch them, and eventually, let them go.")
                agent.add("And best of all, you can do it wherever you want — with or without my help")
                agent.add("Now, you've had some success here. But do you want to try another exercise?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;

            case "pro-con-list":
                agent.add("Making a pro / con list seems like an effective strategy for you!")
                agent.add("It works so well because it doesn't 'forbid' you from eating. Instead, you're using information to make a rational choice.")
                agent.add("Plus, it's a handy way to remind yourself of why you want to stop bingeing in the first place.")
                agent.add("Now, you've had some success here. But do you want to try another exercise?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
}
    }

    else if (preScore > scoreAfter && (preScore - scoreAfter) <= 2) {

        agent.add('Victory! Well done!')
        switch(intervention){
            default:
                agent.add("Nothing works, Matt.")
                break;
            case "distraction":
                agent.add("Distraction seemed to help! At least a little!")
                agent.add("Chances are: it'll only get better from here.")
                agent.add("The great thing about it is, if you repeatedly distract yourself from your cravings, your cravings will get weaker over time.")
                agent.add("You've done good work already. But do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "self-talk":
                agent.add("Self-talk dialed down the intensity of your cravings.")
                agent.add("Modest progress is still progress!")
                agent.add("Also, self-talk is wonderful because it's so versatile. We tried it out loud, but you can do it in your head. Which means You can do it anywhere!")
                agent.add("You've done good work already. But do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "surfing":
                agent.add("Surfing the urge was somewhat effective for you!")
                agent.add("What makes surfing so great is that it reframes your relationship with your cravings.")
                agent.add("Instead of living 'in' them, you stand outside of them, as an observer. Makes them much easier to manage.")
                agent.add("Keep practicing your surfing, and your cravings will definitely get weaker over time.")
                agent.add("You've done good work already. But do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "pro-con-list":
                agent.add("Making a pro / con list seemed to help you a little!")
                agent.add("What's nice about making a list is that it reframes bingeing as a RATIONAL decision")
                agent.add("It brings your 'thinking brain' into the equation — which always helps with managing impulses.")
                agent.add("And besides, it also reminds you of all the reasons you want to stop bingening.")
                agent.add("The more you do it, the more effective it'll be. So try it again, with or without my help!")
                agent.add("You've done good work already. But do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
        }
    }
    else {
        agent.add('Ah, I see.')
        switch(intervention){
            case "distraction":
                agent.add("Looks like distraction wasn't effective for you this time. So sorry!")
                agent.add("Do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "self-talk":
                agent.add("Looks like self-talk didn't quite work out. So sorry!")
                agent.add("Do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "surfing":
                agent.add("Hmm, surfing didn't quite do it this time around. So sorry!")
                agent.add("Do you want to try something else?")
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
            case "pro-con-list":
                agent.add("Making a pro / con list didn't work for you. So sorry!")
                agent.add("Do you want to try something else?");
                agent.add(new Suggestion('Yes.'));
                agent.add(new Suggestion('No.'));
                agent.context.set('awaiting_readiness', 3);
                break;
        }
    };
}


module.exports = {
    evaluationPost
}