const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config =  require("./config/keys.js")



const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { useNewUrlParser: true});
require('./models/Events');



app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


const fr = require('./controllers/fulfillmentRoute')
const tq = require('./controllers/text-query')

app.get('/', (req,res) => {
    res.send({"Borpis": "Alive"});
})

app.post('/', (req, res) => {
    fr.fulfillment(req,res)
})

app.post('/api/df_text_query', (req,res) => {
    tq.textQuery(req,res);
})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
}



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`live and listening on port ${PORT}.`)
})