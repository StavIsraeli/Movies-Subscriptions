const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema(
    {
        fullName : String,
        username : String,
        password : String
    }
)

module.exports = mongoose.model('users', UserSchema)