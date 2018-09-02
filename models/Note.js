var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    type: Schema.Types.ObjectId, 
    title: String,
    date: String,
    body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;