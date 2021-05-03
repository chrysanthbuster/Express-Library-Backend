var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreSchema = new Schema ({
    name: {type: String, required: true}
});

GenreSchema
.virtual("url")
.get(() => { 
    return "/catalog/genre/" + this.id;
});

module.exports = mongoose.model("Genre", GenreSchema);