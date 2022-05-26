import React, { useState, useContext } from 'react'
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {
    const constaxt = useContext(noteContext);
    const { addNote } = constaxt;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    return (
        <div>
            <h2 className="my-3 pt-4">Add a Note</h2>
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Note Title </label>
                            <input type="text" name='title' className="form-control" id="title" value={note.title} onChange={onChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Category <sup>(Optional)</sup></label>
                            <input type="text" name='tag' className="form-control" value={note.tag} id="tag" onChange={onChange} />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note Description </label>
                    <textarea className="form-control" name="description" value={note.description} id="description" onChange={onChange} cols="30" rows="5"></textarea>
                </div>
                <button type="button" className="btn btn-primary" disabled={note.title.length < 3 || note.description.length < 5} onClick={handleSubmit}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote