const mongoose = require('mongoose');

let SubscriptionSchema = new mongoose.Schema(
    {
       movieId : String,
       memberId : String,
       date : String

    }
)

module.exports = mongoose.model('subscriptions', SubscriptionSchema)