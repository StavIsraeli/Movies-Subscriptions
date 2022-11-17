const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema(
    {
        name : String,
        premiered : String,
        genres : [String],
        image : String

    }
)

module.exports = mongoose.model('movies', MovieSchema)