const mongoose = require('mongoose');
const { Schema } = mongoose;

const cravingsSchema = new Schema({
    craving: String,
    name: String,
    scoreBefore: Number,
    scoreAfter: Number,
    intervention: String,
    date: Date

});

mongoose.model('cravings', cravingsSchema, 'cravings')