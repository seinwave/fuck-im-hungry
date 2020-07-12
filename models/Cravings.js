const mongoose = require('mongoose');
const { Schema } = mongoose;

const cravingsSchema = new Schema({
    craving: String,
    name: String
});

mongoose.model('cravings', cravingsSchema, 'cravings')