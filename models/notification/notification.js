const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notificationSchema = new Schema({
  device_id: { type : String, required : true},
  game_text: { type : String, required : true},
  game_id: { type : String, required: true},
  created_at: { type: String, required: true},
  time: { type: String, required: true}
});

const Notification = mongoose.model('Notifications',notificationSchema);

module.exports = Notification;