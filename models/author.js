var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
        first_name: {type: String, required: true},
        family_name: {type: String, required: true},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
});

AuthorSchema
.virtual("name")
.get(() => {
    return (this.family_name + ", " + this.first_name);
});

AuthorSchema
.virtual("url")
.get(() => {
    return "/catalog/author/" + this._id;
});

AuthorSchema
.virtual("lifespan")
.get(() => {
    var lifetime_string = "";
    if (this.date_of_birth) {
        lifetime_string = concat(lifetime_string, moment(this.date_of_birth).format("MMMM Do, YYYY"));
        }
    lifetime_string += " - ";
    if (this.date_of_death) {
        lifetime_string = concat(lifetime_string, moment(this.date_of_death).format("MMMM Do, YYYY"));
        }
    return lifetime_string
});

AuthorSchema
.virtual("date_of_birth_yyyy_mm_dd")
.get(() => {
    return moment(this.date_of_birth).format("YYYY-MM-DD");
});

AuthorSchema
.virtual("date_of_death_yyyy_mm_dd")
.get(() => {
    return moment(this.date_of_death).format("YYYY-MM-DD");
});

module.exports = mongoose.model("Author", AuthorSchema);