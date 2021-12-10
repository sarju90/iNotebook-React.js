
import { React,useContext } from 'react'
import noteContext from '../Context/notes/NoteContext'


const About = () => {

 const a=useContext(noteContext)
 // useEffect(() => {
    //  a.Update()
      
 // }, [])
    return (
        <div>
            This is about {a.name} and he is in class {a.class}
        </div>
    )
}

export default About
