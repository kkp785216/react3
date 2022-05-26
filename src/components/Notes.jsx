import React, { useContext, useState, useRef, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import UpdateNote from './Partials/UpdateNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes } = context;
    const [clickedNote, setClickedNote] = useState({ title: "", description: "", tag: "", _id: "" });
    const navigator = useNavigate();

    // Update a Note
    const ref = useRef(null);
    const updateNote = (note) => {
        setClickedNote(note);
        setTimeout(() => {
            ref.current.click();
        }, 0);
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigator('/login');
        }
    }, [])

    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <>
                <UpdateNote clickedNote={clickedNote} key={clickedNote._id} showAlert={props.showAlert} />
                <button type="button" ref={ref} className="d-none" data-bs-toggle="modal" data-bs-target="#myModal"></button>
            </>
            <h2 className="my-3 pt-3">Your Notes</h2>
            <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1">
                {notes.length > 0 ? notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                }) : <div>Please add some Notes to display here.</div>}
            </div>
        </div>
    )
}

export default Notes