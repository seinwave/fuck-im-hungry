const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


const PORT = process.env.PORT || 3001;

app.get('/', (req,res) => {
    res.send({"Borpis": "Alive"});
})

app.listen(PORT, () => {
    console.log(`live and listening on port ${PORT}.`)
})