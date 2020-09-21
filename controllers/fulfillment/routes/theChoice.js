const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");
const mongoose = require("mongoose");
const Craving = mongoose.model("cravings");
const nlp = require("compromise");
nlp.extend(require("compromise-numbers"));

// Saves user's choice of intervention to MDB document
theChoice = (agent) => {
  let name = agent.session.trimEnd();
  let msg = agent.consoleMessages[0].text;

  Craving.findOne({ name: name }, function (err, doc) {
    if (err) {
      console.log(err);
      agent.add(
        "So sorry, something went wrong on my end. Could you try again?"
      );
    }

    switch (msg) {
      default:
        doc.intervention = "Fuckleberry";
        agent.context.set("awaiting_readiness_distraction", 3);
        break;

      case "Okay, great. Let's distract you from your craving for a little while.":
        doc.intervention = "distraction";
        agent.context.set("awaiting_readiness_distraction", 3);
        break;

      case "Great! Let's try some self-talk!":
        doc.intervention = "self-talk";
        agent.context.set("awaiting_self_readiness", 3);
        break;

      case 'Okay! Let\'s try "surfing the urge."':
        doc.intervention = "surfing";
        agent.context.set("surf-explain-yes", 3);
        agent.context.set("surf-dont-explain-ready", 3);
        break;

      case "Alright! Let's make a pro / con list.":
        doc.intervention = "pro-con-list";
        agent.context.set("procon-ready", 3);
        break;
    }

    doc.date = Date.now();
    return doc.save();
  });

  agent.consoleMessages.map((i) => {
    agent.add(i.text);
    if (i.text.includes("explain")) {
      agent.add(new Suggestion("Yes."));
      agent.add(new Suggestion("No."));
    } else if (i.text.includes("ready")) {
      agent.add(new Suggestion("Ready."));
    }
  });
};

module.exports = {
  theChoice,
};
