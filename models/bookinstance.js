var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
    book: { type: Schema.ObjectId, ref: "Book", required: true }, // Reference to the associated book.
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum:["Available", "Maintenance", "Loaned", "Reserved"], default:"Maintenance"},
    due_back: { type: Date, default: Date.now },
});

BookInstanceSchema
.virtual("url")
.get(() => {
    return "/catalog/bookinstance/"+this._id;
});

BookInstanceSchema
.virtual("due_back_formatted")
.get(() => {
    return moment(this.due_back).format("MMMM Do, YYYY");
});

BookInstanceSchema
.virtual("due_back_yyyy_mm_dd")
.get(() => {
    return moment(this.due_back).format("YYYY-MM-DD");
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
