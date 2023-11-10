const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get',(req, res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;

    // Primero, busca la tarea por ID para obtener su estado actual
    TodoModel.findById(id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }

            // Invierte el valor de "done"
            const updatedDone = !task.done;

            // Actualiza la tarea con el nuevo valor de "done"
            TodoModel.findByIdAndUpdate(id, { done: updatedDone }, { new: true })
                .then(updatedTask => res.json(updatedTask))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});




app.delete('/delete/:id', (req, res) =>{
    const {id} = req.params;
    console.log(id);
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})
app.listen(3001,() =>{
    console.log("server is runing")
})