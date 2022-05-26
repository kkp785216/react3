import React, { useState, useContext, useRef } from 'react'
import noteContext from '../../Context/notes/noteContext';

const UpdateNote = (props) => {
    const constaxt = useContext(noteContext);
    const { editNote } = constaxt;
    const ref = useRef(null)
    const [note, setNote] = useState(props.clickedNote);

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
        editNote(props.clickedNote._id, note.title, note.description, note.tag);
        props.showAlert("Note Updated Successfully", "success");
        ref.current.click();
    }

    return (
        <>
            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={ref} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editTitle" className="form-label">Note Title</label>
                                    <input type="text" name='title' className="form-control" value={note.title} id="utitle" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editTag" className="form-label">Category <sup>(Optional)</sup></label>
                                    <input type="text" name='tag' className="form-control" value={note.tag} id="utag" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editDescription" className="form-label">Note Description </label>
                                    <textarea className="form-control" name="description" value={note.description} id="udescription" onChange={onChange} cols="30" rows="5"></textarea>
                                </div>
                                <button type="button" className="btn btn-success" disabled={note.title.length < 3 || note.description.length < 5} onClick={handleSubmit}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNote