const chatbot = require('./chatbot');

const eventQuery = async (req, res) => {
    let responses = await chatbot
        .eventQuery(req.body.event, req.body.userID, req.body.parameters)

  res.send(responses)
}


module.exports = {
    eventQuery
}