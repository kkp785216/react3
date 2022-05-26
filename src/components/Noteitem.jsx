import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const Noteitem = (props) => {
    const  constaxt = useContext(noteContext);
    const {deleteNote} = constaxt;
    function lastUpdated(input) {
        let dateDiff = (new Date() - new Date(input)) / 1000;
        if (dateDiff < 60) {
            return { date: (Math.floor(dateDiff) > 1 ? Math.floor(dateDiff) + ' Seconds' : Math.floor(dateDiff) + ' Second'), diff: Math.floor(dateDiff) }
        }
        else if (dateDiff < 3600) {
            return { date: (Math.floor(dateDiff / 60) > 1 ? Math.floor(dateDiff / 60) + ' Minutes' : Math.floor(dateDiff / 60) + ' Minute'), diff: Math.floor(dateDiff) }
        }
        else if (dateDiff < 86400) {
            return { date: (Math.floor(dateDiff / 3600) > 1 ? Math.floor(dateDiff / 3600) + ' Hours' : Math.floor(dateDiff / 3600) + ' Hour'), diff: Math.floor(dateDiff) }
        }
        else if (dateDiff < 2592000) {
            return { date: (Math.floor(dateDiff / 86400) > 1 ? Math.floor(dateDiff / 86400) + ' Days' : Math.floor(dateDiff / 86400) + ' Day'), diff: Math.floor(dateDiff) }
        }
        else if (dateDiff < 31536000) {
            return { date: (Math.floor(dateDiff / 2592000) > 1 ? Math.floor(dateDiff / 2592000) + ' Months' : Math.floor(dateDiff / 2592000) + ' Month'), diff: Math.floor(dateDiff) }
        }
        else if (dateDiff >= 31536000) {
            return { date: (Math.floor(dateDiff / 31536000) > 1 ? Math.floor(dateDiff / 31536000) + ' Years' : Math.floor(dateDiff / 31536000) + ' Year'), diff: Math.floor(dateDiff) }
        }
    }
    return (
        <div className="col">
            <div className="card text-dark bg-light mb-4">
                <div className="card-header d-flex justify-content-between">
                    <small>Last Updated {lastUpdated(props.note.date).date} ago.</small>
                    <div className="d-flex align-items-center" style={{ margin: "-.25rem" }}>
                        <i className="bi bi-trash m-1" onClick={()=>{deleteNote(props.note._id)}}></i>
                        <i className="bi bi-pencil-square m-1"  onClick={()=>{/*editNote(props.note._id);*/ props.updateNote(props.note)}}></i>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <small className='px-2 rounded-pill' style={{ backgroundColor: "#e3e3e3" }}><em>{props.note.tag}</em></small>
                </div>
            </div>
        </div>
    )
}

export default Noteitem