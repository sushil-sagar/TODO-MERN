import { useState } from "react"
import axios from 'axios'

const Create = () => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty");
      return;
    }
    axios.post('http://localhost:5000/add', { task })
      .then(() => {
        setTask(""); // Clear the input field
        location.reload(); // Refresh the page to show the updated list
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="create_form">
      <input type="text" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handleAdd}>Submit</button>
    </div>
  )
}

export default Create;
