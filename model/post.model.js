const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
})

const NoteModel=mongoose.model("posts",noteSchema)

module.exports={
    NoteModel
}