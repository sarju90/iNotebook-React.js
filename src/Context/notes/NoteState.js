import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
    
const host="http://localhost:5000";
    const notesIni=[

    ]

    const [notes, setnotes] = useState(notesIni)

    const getNote=async()=>{
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET', 
      
        headers: {
          'Content-Type': 'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTc0ZjRhOWIzYTk1YzMwYjgyYjE3In0sImlhdCI6MTYzNzc3NDU4MH0.OGe8DLknkb0bxlSQPAEisdPMqlF3_iCpTo3uw_jVKM8"
        },
      
      
      });
           const json=await response.json()
           console.log(json)
           setnotes(json);

    }

    const addNote=async(title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST', 
      
        headers: {
          'Content-Type': 'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTc0ZjRhOWIzYTk1YzMwYjgyYjE3In0sImlhdCI6MTYzNzc3NDU4MH0.OGe8DLknkb0bxlSQPAEisdPMqlF3_iCpTo3uw_jVKM8"
        },
      
        body: JSON.stringify({title,description,tag}) 
      });
      const note=await response.json();
      setnotes(notes.concat(note))
 
    
    }


    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: 'DELETE', 
      
        headers: {
          'Content-Type': 'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTc0ZjRhOWIzYTk1YzMwYjgyYjE3In0sImlhdCI6MTYzNzc3NDU4MH0.OGe8DLknkb0bxlSQPAEisdPMqlF3_iCpTo3uw_jVKM8"
        },
       
      });
      const json= response.json();
      console.log(json)


     const  newnotes=notes.filter((note)=>{ return note._id!==id})
      setnotes(newnotes)
    }

    const editNote=async(id,title,description,tag)=>{

      
  
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
    method: 'PUT', 
  
    headers: {
      'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTc0ZjRhOWIzYTk1YzMwYjgyYjE3In0sImlhdCI6MTYzNzc3NDU4MH0.OGe8DLknkb0bxlSQPAEisdPMqlF3_iCpTo3uw_jVKM8"
    },
  
    body: JSON.stringify({title,description,tag}) 
  });
 const json= response.json();

let newnotes=JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newnotes.length; index++) {
        const element = newnotes[index];
        if(element._id===id){
          newnotes[index].title=title;
          newnotes[index].description=description;
          newnotes[index].tag=tag;
          break;
        }
        
      }
      setnotes(newnotes)
    }

  /*  const s={
        "name":"Sarju",
        "class":"6c"
    }

    const [state, setstate] = useState(s)

    const Update=()=>{
        setTimeout(() => {
            setstate({
                "name":"Raj",
                "class":"8a"
            })
        }, 1000);

    }*/

    return (

        <noteContext.Provider value={{notes,addNote,deleteNote,getNote,editNote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;