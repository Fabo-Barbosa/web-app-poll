const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
  name: { type: String, required: true, trim: true },
  poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  voteCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('topic', TopicSchema);