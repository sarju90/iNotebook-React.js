
const express = require('express') ;
const router = express.Router();
const Notes= require('../models/Notes');
var fetchuser=require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator');

//router:1 fetch notes
router.get('/fetchnotes',fetchuser,async(req,res)=>{

    try {
        const notes=await Notes.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        return  res.status(500).json({error:"Internal server error accured"});
      }
         
})
//route:2 add notes
router.post('/addnotes',fetchuser,[
    body('title','Enter a valid title ').isLength({ min: 3 }),

    body('description','Enter description with minimum lenght 5').isLength({ min: 5 }),

],async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const {title,description,tag} = req.body;
const note=new Notes({
    title,description,tag,user:req.user.id

})

const savedNote = await note.save()

res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        return  res.status(500).json({error:"Internal server error accured"});
      }

})


//router:3 update notes
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{

try {
    

    const {title,description,tag} = req.body;
    let newNote={

    };
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

     let note= await Notes.findById(req.params.id);
     if(!note){
       return  res.status(404).send("Not found")
     }
     if(note.user.toString() !== req.user.id){
        return  res.status(401).send("Not allowed")
     }

     note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
     res.json({note});
    }catch (error) {
        console.error(error.message)
        return  res.status(500).json({error:"Internal server error accured"});
      }
         
})

//Router 4 :delete notes
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{

    try {
     
         let note= await Notes.findById(req.params.id);
         if(!note){
           return  res.status(404).send("Not found")
         }
         if(note.user.toString() !== req.user.id){
            return  res.status(401).send("Not allowed")
         }
    
         note= await Notes.findByIdAndDelete(req.params.id)
         res.json({"Success":"Note has been deleted"});
        }catch (error) {
            console.error(error.message)
            return  res.status(500).json({error:"Internal server error accured"});
          }
             
    })
    
module.exports= router