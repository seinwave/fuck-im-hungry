const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");

const selection = (agent) => {
  agent.consoleMessages.map((i) => {
    agent.add(i.text);
  });
  agent.add(new Suggestion("Distraction."));
  agent.add(new Suggestion("Self-talk."));
  agent.add(new Suggestion('"Surfing".'));
  agent.add(new Suggestion("Pro / Con List."));
};

module.exports = {
  selection,
};
