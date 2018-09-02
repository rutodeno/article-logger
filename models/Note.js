var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline" 
    },
    date: {
        type: Date,
        default: Date.now
    },
    noteText: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;