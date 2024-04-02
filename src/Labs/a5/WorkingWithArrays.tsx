import React, { useState,useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
  interface Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
  }
    const API = process.env.REACT_APP_API_BASE;
    const [errorMessage, setErrorMessage] = useState(null);
    const [todo, setTodo] = useState({
      id:1,
      title:"Node JS Assignment",
      description:"Create a NodeJs server with ExpressJs",
      due:"2021-09-09",
      completed:false,
    });
    
    const [todos, setTodos] = useState<Todo[]>([]);
    
    const postTodo = async () => {
      const response = await axios.post<Todo[]>(API!, todo);
      setTodos([...todos,...response.data]);
    };

    const fetchTodos = async () => {
      const response = await axios.get(API!);
      setTodos(response.data);
    };

    const deleteTodo = async (todo: { id: number; }) => {
      try{
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
      }
      catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message || 'An unknown error occurred';
          setErrorMessage(message);
        } else {
          console.log('Non-Axios error:', error);
          const msg="An unexpected error occurred";
          // setErrorMessage(msg);
        };
      }
  
    };
  
    
    useEffect(() => {
      fetchTodos();
    }, []);

    const updateTodo = async () => {
      try{
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      }
      catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message || 'An unknown error occurred';
          setErrorMessage(message);
        } else {
          console.log('Non-Axios error:', error);
          const msg="An unexpected error occurred";
          // setErrorMessage(msg);
        };
      }
  
    };
  
    const removeTodo = async (todo: { id: any; title?: string; }) => {
      const response = await axios
        .get(`${API}/${todo.id}/delete`);
      setTodos(response.data);
    };
  
    const createTodo = async () => {
      const response = await axios.get(`${API}/create`);
      setTodos(response.data);
    };
  
    const fetchTodoById = async (id:number) => {
      const response = await axios.get(`${API}/${id}`);
      setTodo(response.data);
    };
    const updateTitle = async () => {
      const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
      setTodos(response.data);
    };
  
    
    const[complete,setComplete]=useState(todo.completed);

    const handleChange=()=>{
      setComplete(!todo.completed);
      setTodo({...todo,
      completed:complete});
    }
    
    
  
    return (
      <div>
        
        <h3>Working with Arrays</h3>
        <button className="btn btn-primary" onClick={createTodo} >
          Create Todo
        </button><br/>
        <button className="btn btn-success" onClick={updateTitle} >
          Update Title
        </button>

        <ul>
          {todos.map((todo:Todo) => (
            <li key={todo.id}>
              <input checked={todo.completed}
              type="checkbox" readOnly />
              {todo.title}
              <p>{todo.description}</p>
              <p>{todo.due}</p>
              <button className="btn btn-danger" onClick={() => deleteTodo(todo)} >
                Remove
              </button>
              <button className="btn btn-warning" onClick={() => fetchTodoById(todo.id)} >
                Edit
            </button>
            </li>
          ))}
        </ul>

        <textarea 
          value={todo.description} 
          onChange={(e) => setTodo(
            { ...todo,
              description: e.target.value  
            })} 
        />

        <input 
          value={todo.due} 
          type="date"
          onChange={(e) => setTodo(
            {
              ...todo, due: e.target.value 
            })} 
        />

        
        <label>
        
          <input 
            checked={todo.completed} 
            type="checkbox"
            onChange={(e) => setTodo(
              {
                ...todo, completed: e.target.checked 
              })} 
          />

          Completed

        </label>

      <button onClick={postTodo}> Post Todo </button>
      <button onClick={updateTodo}> Update Todo </button>

        
        <h3>Retrieving Arrays</h3>
        <a className="btn btn-primary" href={API}>
          Get Todos
        </a>

        <h3>Retrieving an Item from an Array by ID</h3>
        <input value={todo.id}
            onChange={(e)=>setTodo({...todo,
            id:parseInt(e.target.value)})}/>
        <a className="btn btn-primary" href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>

        <h3>Filtering Array Items</h3>
        <a className="btn btn-primary" href={`${API}?completed=true`}>
          Get Completed Todos
        </a>
        
        <h3>Creating new Items in an Array</h3>
        <a className="btn btn-primary" href={`${API}/create`}>
          Create Todo
        </a>

        <h3>Deleting from an Array</h3>
        <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
          Delete Todo with ID = {todo.id}
        </a>

        <h3>Updating an Item in an Array</h3>
        <input type="number" value={todo.id}
            onChange={(e)=>setTodo({...todo,
            id:parseInt(e.target.value)})}/>
        <br/><br/>
        <input type="text" value={todo.title}
          onChange={(e)=>setTodo({...todo,
          title:e.target.value})}/>
        <br/>
        <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`}>
          Update Title to {todo.title}
        </a>

        <h3>Change description and completed status</h3>
        <input type="number" value={todo.id}
        onChange={(e)=>setTodo({...todo,
        id:parseInt(e.target.value)})}/>

        <br/><br/>

        <input type="text" value={todo.description}
        onChange={(e)=>setTodo({...todo,
        description:e.target.value})}/>
        

        <br/><br/>

        <input type="checkbox" checked={todo.completed}
        onChange={()=>handleChange}/>
        <br/>
        <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`}>Change Completion Status</a>
        <br/><br/>
        <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`}>Change Description</a>

      </div>
    );
  }
  export default WorkingWithArrays;