'use strict'

const df = require('dialogflow');
const devConfig =  require("../config/dev.js")
const structjson = require('../config/structjson')

const projectID = devConfig.googleProjectID;
const sessionID = devConfig.dialogFlowSessionID;

const credentials = {
    client_email: devConfig.googleClientEmail,
    private_key: devConfig.googlePrivateKey
}

const sessionClient = new df.SessionsClient({projectID, credentials})

const textQuery = async (text, userID, parameters = {}) => {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text:text,
                languageCode: devConfig.dialogFlowSessionLanguageCode,
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

module.exports = {
    textQuery
}



