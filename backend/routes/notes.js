const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const { response } = require('express');

// Fetch all the Notes: GET "api/notes/fethallnotes" . Auth required , Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add a new note: POST "api/notes/addnote" . Auth required , Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there is an error then send bad request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        const saveNote = await note.save();
        res.json(saveNote);

    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
});


// Update a existing note: PUT "api/notes/updatenote" . Auth required , Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title; };
        if (description) { newNote.description = description; };
        if (tag) { newNote.tag = tag; };
        
        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ error: "Note not found" }) };

        // Allow Updatation if user own this note
        if (note.user.toString() !== req.user.id) { return res.status(401).json({ error: "Action not allowed" }) };
        
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});

    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a existing note: DELETE "api/notes/deletenote" . Auth required , Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
        // find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ error: "Note not found" }) };

        // Allow deletation if user own this note
        if (note.user.toString() !== req.user.id) { return res.status(401).json({ error: "Action not allowed" }) };
        
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({success:"Note has been deleted", note});

    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;