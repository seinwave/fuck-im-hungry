const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = require('./config/dev')


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { useNewUrlParser: true});
require('./models/Events');



app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const tq = require('./controllers/text-query')

const PORT = process.env.PORT || 3001;

app.get('/', (req,res) => {
    res.send({"Borpis": "Alive"});
})

app.post('/api/df_text_query', (req,res) => {
    tq.textQuery(req,res);
})

app.listen(PORT, () => {
    console.log(`live and listening on port ${PORT}.`)
})