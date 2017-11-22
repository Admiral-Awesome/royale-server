const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
  device_id: { type : String, required : true},
  game_text: { type : String, required : true},
  game_id: { type : String, required: true},
  created_at: Date,
  updated_at: Date
});

const Notification = mongoose.model('User',notificationSchema);

module.exports = Notification;