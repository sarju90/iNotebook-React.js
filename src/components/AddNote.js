
import React, {useContext, useState} from 'react'
import noteContext from "../Context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote}= context;

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleclick=(e)=>{
        e.preventDefault();
       addNote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:""})
       props.showAlert("Note Added Successfully","success")


    }

    const onchange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value});
    }
   
    return (
        <div className="container my-3">
            <h2>Add a Notes</h2>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" required id="title" value={note.title} onChange={onchange} aria-describedby="emailHelp" />
                   
                </div>
                <div className="mb-3">
                    <label htmlfor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" required  onChange={onchange} value={note.description} name="description" />
                </div>

                <div className="mb-3">
                    <label htmlfor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" required  onChange={onchange} value={note.tag} name="tag" />
                </div>
               
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary my-2" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
