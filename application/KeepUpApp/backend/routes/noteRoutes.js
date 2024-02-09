const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router();

//Gets all the notes from DB to displays them.

noteRouter.get("/",async(req,res)=>{
    try {

        let data = await NoteModel.find()
        res.send({
            data:data,
            message:"Success",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

//Adds the notes input to the DB.

noteRouter.post("/create",async(req,res)=>{

    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message:"Note created",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

//Updates existing notes in the DB

noteRouter.patch("/",async(req,res)=>{

    let {id} = req.headers
    try {
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Note updated",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
    
})

//Deletes existing notes from DB

noteRouter.delete("/",async(req,res)=>{
    
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Note deleted",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
    
})

module.exports = {
  noteRouter,
};
