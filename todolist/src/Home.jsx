import React, { useEffect, useState } from "react";
import './App.css'; // Importa tus estilos CSS aquí
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';


function Home(){
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
        .then(result => {
            // Actualiza el estado "done" de la tarea correspondiente
            setTodos(prevTodos => prevTodos.map(todo => {
                if (todo._id === id) {
                    return { ...todo, done: !todo.done };
                }
                
                return todo;
            }));
        })
        .catch(err => console.log(err))
    }
    
    

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result =>{
            location.reload()
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="home"> {/* Aplica la clase CSS 'home' aquí */}
            <h2>ToDo list</h2>
            <Create />
            {
                todos.length === 0 ?
                <div><h2>No hay registros</h2></div>
                :
                todos.map(todo => (
                    <div className="task">
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill className="icon" />
                            ) : (
                                <BsCircleFill className="icon" />
                            )}
                            
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
                
                
            }
        </div>
    )
}

export default Home;
