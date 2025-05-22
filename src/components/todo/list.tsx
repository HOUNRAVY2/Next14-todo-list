"use client"
import { Todo } from '@/type/todo.type';
import { useState, useEffect, KeyboardEvent  } from 'react';
import { fetchDataByGet } from '@/util/apiService';

export default function List() {
  const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<any | unknown>(null);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
  
    // Fetch todos from API
    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const resTodo = await fetch(fetchDataByGet('/todo'));
          const data = await resTodo.json();
          setTodos(data);
          setFilteredTodos(data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
  
      fetchTodos();
    }, []);
  
    // Filter todos based on input
    useEffect(() => {
      if (inputValue.trim() === '') {
        setFilteredTodos(todos);
        } else {
          const filtered = todos.filter(todo => 
            todo.todo.toLowerCase().includes(inputValue.toLowerCase())
          );
          setFilteredTodos(filtered);
        }
      setIsFiltering(inputValue.trim() !== '');
    }, [inputValue, todos]);
  
    const handleAddTodo = (e:KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
  
      const trimmedValue = inputValue.trim();
      
      // Validate empty input
      if (!trimmedValue) {
        alert('Todo cannot be empty!');
        return;
      }
  
      // Check for duplicates
      const isDuplicate = todos.some(
        todo => todo.todo.toLowerCase() === trimmedValue.toLowerCase()
      );
  
      if (isDuplicate) {
        alert('This todo already exists!');
        return;
      }
  
      if (editingId) {
        // Update existing todo
        setTodos(todos.map(todo => 
          todo.id === editingId ? { ...todo, todo: trimmedValue } : todo
        ));
        setEditingId(null);
      } else {
        // Add new todo
        const newTodo = {
          id: Date.now().toString(),
          todo: trimmedValue,
          isCompleted: false,
          createdAt: new Date().toISOString()
        };
        setTodos([...todos, newTodo]);
      }
  
      setInputValue('');
    };
  
    const handleRemoveTodo = (id: number | string) => {
      setTodos(todos.filter(todo => todo.id !== id));
    };
  
    const handleEditTodo = (id:string, text:string) => {
      setInputValue(text);
      setEditingId(id);
    };
  
    const handleToggleComplete = (id:string) => {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ));
    };
  
    return (
      <div className=' text-white'>
        <h1>Todo List</h1>
        <input
        className=' text-black'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTodo}
          placeholder={editingId ? "Edit your todo..." : "Add a new todo..."}
        />
        
        <ul>
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <li 
                key={todo.id} 
                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
              >
                {todo.todo}
                <span style={{ marginLeft: '10px', opacity: 0.5 }}>
                  <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                  <button onClick={() => handleEditTodo(todo.id, todo.todo)}>Edit</button>
                  <button onClick={() => handleToggleComplete(todo.id)}>
                    {todo.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </span>
              </li>
            ))
          ) : isFiltering ? (
            <li>No result. Create a new one instead!</li>
          ) : (
            <li>empty</li>
          )}
        </ul>
      </div>
    );
}
