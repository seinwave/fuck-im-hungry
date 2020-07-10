'use strict'

const df = require('dialogflow');
const config =  require("./config/keys.js")
const structjson = require('../config/structjson')

const mongoose = require('mongoose');
const Events = mongoose.model('events')

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new df.SessionsClient({projectID, credentials})

const textQuery = async (text, parameters = {}) => {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID);
    let self = module.exports; 
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text:text,
                languageCode: config.dialogFlowSessionLanguageCode,
            },
        },
        queryParams: {
            payload: {
                data: parameters
            }
        }
    };

    let responses = await sessionClient

        .detectIntent(request);
        responses = await self.handleAction(responses)
            return responses

        // .catch((error) => {
        //     console.log(error)
        // })

}

const handleAction = (responses) => {
    console.log("HandleAction responses:",responses)
    let self = module.exports;
      let queryResult = responses[0].queryResult;
      switch (queryResult.action){
        case 'event-yes':
          if (queryResult.allRequiredParamsPresent){
            self.saveRegistration(queryResult.parameters.fields)
          }
          break; 
      }
      return responses;
  }

const saveRegistration =  async (fields) => {
    console.log("fields are:", fields)
    let registration = new Events({
        event_name: fields.event_name.stringValue,
        devangel_name: fields.devangel_name.stringValue,
    });
    try{
        let reg = await registration.save();
        console.log("This was saved:", reg);
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    textQuery,
    saveRegistration,
    handleAction
}



