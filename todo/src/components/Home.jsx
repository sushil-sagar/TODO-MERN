import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:5000/update/${id}`, { done: true })
      .then(() => {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, done: true } : todo));
      })
      .catch(err => console.log(err));
  }
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ?
        <div>
          <h2>No Records</h2>
        </div>
        :
        todos.map(todo => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? <BsCheckCircleFill className="icon" /> : <BsCircleFill className="icon" />}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Home;
