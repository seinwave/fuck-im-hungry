const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");

const zeroToTen = (agent) => {
  agent.consoleMessages.map((i) => {
    agent.add(i.text);
  });
  agent.add(new Suggestion("0"));
  agent.add(new Suggestion("1"));
  agent.add(new Suggestion("2"));
  agent.add(new Suggestion("3"));
  agent.add(new Suggestion("4"));
  agent.add(new Suggestion("5"));
  agent.add(new Suggestion("6"));
  agent.add(new Suggestion("7"));
  agent.add(new Suggestion("8"));
  agent.add(new Suggestion("9"));
  agent.add(new Suggestion("10"));
};

module.exports = {
  zeroToTen,
};
