const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");
const mongoose = require("mongoose");
const Craving = mongoose.model("cravings");
const nlp = require("compromise");
nlp.extend(require("compromise-numbers"));

selfTalk = async (agent) => {
  let name = agent.session.trimEnd();

  let preScoreObj = await Craving.findOne({ name: name }, "scoreBefore").exec();
  // Accessing the results of the query
  let preScore = preScoreObj.scoreBefore;

  let percentage = (preScore / 10) * 100;
  let doc = nlp(percentage);
  let numberWord = doc.numbers().toText().text();

  agent.add(
    "For this technique, you're going to practice working through your cravings, out loud."
  );
  agent.add(
    "The goal of self-talk is to transform your cravings into something you can manage, by verbalizing them."
  );

  agent.add(
    `You rated your cravings at an ${preScore}. Why don't we start there? Say, out loud, "I rate my craving at a ${preScore} out of 10." Or, "I'd say my urge to binge is at about ${numberWord} percent."`
  );
  agent.add("Let me know when you've done that.");
  agent.add(new Suggestion("All done."));
  agent.context.set("selftalk-two", 1);
  agent.context.set("selftalk-three", 1);
};

module.exports = {
  selfTalk,
};
