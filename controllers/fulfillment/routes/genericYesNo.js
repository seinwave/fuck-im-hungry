const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");

const yesNo = (agent) => {
  agent.consoleMessages.map((i) => {
    agent.add(i.text);
  });
  agent.add(new Suggestion("Yes."));
  agent.add(new Suggestion("No."));
};

module.exports = {
  yesNo,
};
