import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const defaultTag = "default"
    const [notes, setNotes] = useState([]);

    // Fetch all notes for the first time
    useEffect(() => {
        fetchNotes();
    }, []);

    // Fetch All Notes
    const fetchNotes = async () => {
        // TODO API CALL
        const url = `${host}/api/notes/fetchallnotes`
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }).then((response) => { return response.json() })
            .then((result) => {
                setNotes(result);
            });
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO API CALL
        const url = `${host}/api/notes/addnote`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag: tag === "" ? defaultTag : tag })
        }).then((response) => { return response.json() })
            .then((result) => {
                if (result._id) {
                    let note = {
                        "_id": result._id,
                        "user": result.user,
                        "title": result.title,
                        "description": result.description,
                        "tag": tag === "" ? defaultTag : result.tag,
                        "date": result.date,
                        "__v": 0
                    }
                    setNotes(notes.concat(note));
                    props.showAlert('Note Added', 'success');
                }
                else {
                    props.showAlert('Some problem facing when adding Note', 'danger');
                }
            });

    }

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO API CALL
        const url = `${host}/api/notes/deletenote/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }).then((response) => { return response.json() })
            .then((result) => {
                if (result.note) {
                    const newNote = notes.filter((notes) => { return notes._id !== id });
                    setNotes(newNote);
                    props.showAlert('Note Deleted Successfully', 'success');
                }
                else {
                    props.showAlert('Some problem facing when deleting Note', 'danger');
                }
            });
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description, tag })
            body: JSON.stringify({
                "title": title,
                "description": description,
                "tag": tag === "" ? defaultTag : tag
            })
        }).then((response) => { return response.json() })
            .then((result) => {
                if (result.note) {
                    let newNote = JSON.parse(JSON.stringify(notes));
                    for (let index = 0; index < newNote.length; index++) {
                        const element = newNote[index];
                        if (element._id === result.note._id) {
                            element.title = result.note.title;
                            element.description = result.note.description;
                            element.tag = result.note.tag;
                            break;
                        }
                    }
                    setNotes(newNote);
                    props.showAlert('Note Updated Successfully', 'success');
                }
                else {
                    props.showAlert('Some problem facing when Updating Note', 'danger');
                }
            });
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;