const chatbot = require("./chatbot");

const textQuery = async (req, res) => {
  let responses = await chatbot.textQuery(
    req.body.text,
    req.body.userID,
    req.body.parameters
  );

  res.send(responses);
};

module.exports = {
  textQuery,
};
