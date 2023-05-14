const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { validationResult, body } = require('express-validator');

//ROUTE 1: get all teh notes using : GET '/api/notes/getnotes' .login required
router.get('/getnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal error Occoured')
    }

})

//ROUTE 2: Add a new Note: post '/api/notes/addnote' .login required
router.post('/addnote', fetchUser, [body('Title', 'enter a Title').isLength({ min: 3,max:15 }), body('Description', 'Enter Content').isLength({ min: 5 })], async (req, res) => {

   try {const { Title, Description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const notes = new Notes({
        Title, Description, tag, user: req.user.id
    })
    const savedNote = await notes.save();
    res.json(savedNote)}
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal error Occoured')
    }

})
//ROUTE 3: update a existing Note: post '/api/notes/updatenote' .login required
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
   try{ const { Title, Description, tag } = req.body;
    //create a newNote object
    const newNote = {    };
    if (Title) {        newNote.Title = Title }
    if(Description){ newNote.Description=Description}
    if(tag){newNote.tag=tag}
    //find the note to update

    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send('not Found')}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('not Allowed')
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})}


    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal error Occoured')
    }

})
//ROUTE 4: Delete a existing Note: post '/api/notes/delete' .login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try{const { Title, Description, tag } = req.body;
  
    //find the note to be deleted

    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send('not Found')}
    //allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('not Allowed')
    }
    note = await Notes.findByIdAndDelete(req.params.id)
res.json({"succes":"note deleted"})}
catch (error) {
    console.error(error.message);
    res.status(500).send('Internal error Occoured')
}
})

router.get('/viewnote/:id',fetchUser,async(req,res)=>{
  try{
    const { Title, Description, tag } = req.body;
  
    //find the note to be deleted

    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send('not Found')}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('not Allowed')
    }
    var val =note
    res.json(val)
// console.log(res.json(note))
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal error Occoured')
}



})


module.exports = router;
