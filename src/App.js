import React, { useEffect, useState } from "react";
import "./App.css";

function Todo({ todo, index, removeTodo }) {
  return (
    <div className="todo">
      {todo.label}
    <div>
        
        <button onClick={() => removeTodo(index)}><span>x</span></button>
      </div>
    </div>
  );
}


function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  

  return (
    
    <form onSubmit={handleSubmit}>
      <h1> Todo </h1>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={addTodo.isCompleted ? "AL DÍA" : "ADD TODO"}
      />
    </form>
  );
}

function App() {
  const url = "http://assets.breatheco.de/apis/fake/todos/user/laura";
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo(url);
  }, [])
  
  
const getTodo = url => {
    fetch(url, {
      method: 'GET', //Get, put, post, delete
      //body: data //post, put
      headers: {
          'Content-Type': 'application/json'
      }
   })
   .then(response => response.json())
   .then(data => setTodos(data))
  }
  const getUpdate = url =>{
    fetch( url, {
      method: 'PUT',
      body: JSON.stringify(todos),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setTodos(data))
}
  const deleteTodo = url =>{
    fetch( url, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setTodos(data))
  }
  const addTodo = text => {
    const newTodos = [...todos, { label: text, done: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
      <TodoForm addTodo={addTodo} />
      
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            onClick={() => getUpdate(todo)}
          />
        ))}
       <button
					type="button"
					className="btn btn-danger"
					onClick={() => deleteTodo()}>
					Delete All
				</button>
      </div>
      
    </div>
  );
}

export default App;
