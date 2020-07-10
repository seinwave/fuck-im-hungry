const mongoose = require('mongoose');
const { Schema } = mongoose;

const cravingsSchema = new Schema({
    craving: Number
});

mongoose.model('cravings', cravingsSchema, 'cravings')