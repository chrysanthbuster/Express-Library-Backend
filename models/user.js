var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        created_date: { type: Date }
    }
);




// Export model.
module.exports = mongoose.model("User", UserSchema);
