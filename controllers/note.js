let db = require('../models');

module.exports = {
    find: function(req, res) {
        db.Note.find({_headlineId: req.params.id }).
        then(function(dbNote) {
            res.json(dbNote);
        });
    },

    // create

    create: function(req, res) {
        db.Note.create(req.body).
        then(function(dbNote) {
            res.json(dbNote);
        });
    },

    // delete
    delete: function(req, res) {
        db.Note.remove({_id: req.params.id }).then(function(dbNote) {
            res.json(dbNote);
        });
    }
};