exports.handler = function (context,event,callback) {
    let memory = JSON.parse(event.Memory);
    let event_name = memory.twilio.collected_data.event_sponsorship.answers.event_name.answer || 'event name';
    let devangel_name = memory.twilio.collected_data.event_sponsorship.answers.devangel_name.answer || 'not sure';
    
    console.log("event_name ", event_name, "devangel_name ", devangel_name);
    
    const MongoClient = require('mongodb').MongoClient;
    const uri = context.MONGO_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    MongoClient.connect(uri, function(err, db){
        if (err) console.log("err");
        var dbo = db.db("events");
        var eventObj = {
            "event_name ": event_name, 
            "devangel_name ": devangel_name
        }
        dbo.collection("events_list").insertOne(eventObj, function(err, res) {
            if (err) console.log("err");
            console.log("1 doc inserted");
            db.close();
        });
        
        const response =  { actions: [{
            say: "Got the input for " + event_name + "!" 
        }]};
        callback(null, response);
    }

    )};


    