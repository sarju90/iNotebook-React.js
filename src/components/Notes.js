
import React, { useContext, useState, useEffect ,useRef} from 'react'
import noteContext from "../Context/notes/NoteContext";
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = (props) => {

    const context = useContext(noteContext)
    const { notes, getNote,editNote } = context;

    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }
        , [])

    const ref = useRef(null)

    const closeref = useRef(null)

    const updateNote = (currentnote)=>{
           ref.current.click();
           setNote({id:currentnote._id, etitle:currentnote.title , edescription:currentnote.description , etag:currentnote.tag});

    }

    const handleclick=(e)=>{

        editNote(note.id,note.etitle,note.edescription,note.etag)

        closeref.current.click();

        props.showAlert("Note Updated Successfully","success")
  

    }

    const onchange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value});

    }
   
     
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            
            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                
                            </button>
                        </div>
                        <div className="modal-body">
                        <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle}  onChange={onchange} aria-describedby="emailHelp" />
                   
                </div>
                <div className="mb-3">
                    <label htmlfor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} onChange={onchange} name="edescription" />
                </div>

                <div className="mb-3">
                    <label htmlfor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag"  onChange={onchange} value={note.etag}  name="etag" />
                </div>
               
                
            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 mx-1">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                  {notes.length ==0 && 'No notes found'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert}  updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
