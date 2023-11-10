import React, { useState } from "react";
import './App.css'; // Importa tus estilos CSS aquí
import axios from 'axios'

function Create(){
    const [task, setTask] = useState()
    const handleadd = () => {
        axios.post('http://localhost:3001/add',{task: task})
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="create_form"> {/* Aplica la clase CSS 'create_form' aquí */}
            <input type="text" placeholder="Ingresa una tarea" onChange={(e) => setTask(e.target.value)}/>
            <button type="button" onClick={handleadd}>add</button>
        </div>
    )
}

export default Create;
