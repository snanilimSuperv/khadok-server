var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
}

var timeSettingsSchema = {
    breakfast: Boolean,
    fast_start_time: Number,
    fast_end_time: Number,
    lunch: Boolean,
    lunch_start_time: Number,
    lunch_end_time: Number,
    dinner: Boolean,
    dinner_start_time: Number,
    dinner_end_time: Number,
}

var khadokGroupSchema = new mongoose.Schema({
    name: String,
    pin: String,
    timeSettings: timeSettingsSchema,
    membersId: [mongoose.Schema.Types.ObjectId],

}, schemaOptions);

var khadokGroup = mongoose.model('khadokGroup', khadokGroupSchema);

module.exports = khadokGroup;