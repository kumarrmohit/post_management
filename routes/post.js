const express = require("express")
const { NoteModel } = require("../model/post.model")
const noteRouter = express.Router()

noteRouter.get("/", async (req, res) => {
    const notes = await NoteModel.find()
    res.send(notes)
})

noteRouter.post("/add", async (req, res) => {
    const payload = req.body
    const note = new NoteModel(payload)
    await note.save()
    res.send({ "msg": "Node Created" })
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id
    await NoteModel.findByIdAndDelete({ _id: noteID })
    res.send({ "msg": `Note with id:${noteID} has been deleted` })
})

noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const noteID = req.params.id
    await NoteModel.findByIdAndUpdate({ _id: noteID }, payload)
    res.send({ "msg": `Note with id:${noteID} has been updated` })
})

//searching anything by device name

noteRouter.get("/search/:key", async (req, res) => {
    console.log(req.params.key)
    let data = await NoteModel.find(
        {
            "$or": [
                { device: { $regex: req.params.key } }
            ]
        }
    )
    res.send(data)
    console.log(data)
})
module.exports = {
    noteRouter
}
