var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
}


var costSchema = new mongoose.Schema({

    khadokGroupId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    price: Number


}, schemaOptions);

var cost = mongoose.model('cost', costSchema);

module.exports = cost;