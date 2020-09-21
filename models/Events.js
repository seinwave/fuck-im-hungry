const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventsSchema = new Schema({
  event_name: String,
  devangel_name: String,
});

mongoose.model("events", eventsSchema, "events_list");
