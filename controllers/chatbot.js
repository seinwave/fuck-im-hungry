'use strict'

const df = require('dialogflow');
const config =  require("../config/keys.js")
const structjson = require('../config/structjson')

const mongoose = require('mongoose');
const Events = mongoose.model('events')
const Cravings = mongoose.model('cravings')

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new df.SessionsClient({projectID, credentials})

const textQuery = async (text, userID, parameters = {}) => {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
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
                // fields: {
                //     source: {
                //         stringValue: 'PLATFORM_UNSPECIFIED',
                //         kind: 'stringValue'
                //     }
                // }
            }
        }
    };

    

    let responses = await sessionClient
        .detectIntent(request);
        return responses

        // .catch((error) => {
        //     console.log(error)
        // })

}

const eventQuery = async (event, userID, parameters= {}) => {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    let self = module.exports;
    const request = {
        session: sessionPath,
        queryInput: {
          event: {
            // The query to send to the dialogflow agent
            name: event,
            parameters: structjson.jsonToStructProto(parameters),
            // The language used by the client (en-US)
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
        
        return responses
}

const saveCraving =  async (fields) => {
    console.log("fields are:", fields)
    let registration = new Cravings({
        craving: fields.degree.value
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
    eventQuery,
    saveCraving
}



