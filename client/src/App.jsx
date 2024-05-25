import axios from 'axios';
import React, {useState, useEffect} from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const API_URI = "https://track-my-day.onrender.com/tasks/";
  const [todos, setTodos] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState(null);

  const fetchData=async ()=>{
    await axios.get(`${API_URI}`)
    .then((response)=>{
      if (Array.isArray(response.data.data)) {
        setTodos(response.data.data);
      }
    })
    .catch((err)=>console.log(err));
  }

  useEffect(() => {
    fetchData()
  },[])
  
  const handleCreateTodo=async (todo)=>{
    try {
      const res=await axios.post(`${API_URI}`, todo)
      setTodos([...todos, res.data.data])
    } catch (error) {
      console.log("error creating todo", error)
    }
  }

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const res = await axios.put(`${API_URI}/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? res.data.data : todo)));
    } catch (error) {
      console.log("Error updating todo", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URI}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-slate-50 h-max">
      <h1 className=" text-4xl font-bold mb-4 text-nowrap text-center pt-8">TRACK-<span className=' text-red-500'>MY</span>-DAY</h1>
      <TodoForm
        onCreateTodo={handleCreateTodo}
        onUpdateTodo={handleUpdateTodo}
        selectedTodos={selectedTodos}
        setSelectedTodos={setSelectedTodos}
      />
      <TodoList
        todos={todos}
        onEdit={setSelectedTodos}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App