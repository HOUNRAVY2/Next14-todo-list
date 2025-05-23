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
      if (!trimmedValue) {
        alert('Todo cannot be empty!');
        return;
      }
  
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
           <div className=" text-center pt-[30px] pb-[10px]">
          <h3 className=" text-white font-semibold text-[24px]">Todo List</h3>
        </div>
         <div className=' flex justify-center items-center  '>
           <input
        className={` text-black focus:nome  ${isFiltering && `focus:outline-[#3333ff]`} ${!isFiltering && 'focus:outline-red-600'}   py-[10px] px-[20px] rounded-md md:w-[350px] w-full text-[12px]`}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTodo}
          placeholder={editingId ? "Edit your todo..." : "Add a new todo..."}
        />
        </div>
        
        <div className='flex justify-center items-center'>
        <ul className='py-[20px] space-y-[10px] '>
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <li className={`${todo.isCompleted && 'line-through'} hover:opacity-90 hover:scale-[1.02] group cursor-pointer relative overflow-hidden px-[10px] py-[8px] bg-white/35 h-auto break-words border-[1px] rounded-md border-white  md:w-[350px] w-full`}
                key={todo.id} 
              >
                {todo.todo}
                <span className=' absolute  group-hover:right-[10px] text-[14px] right-[-300px] delay-100 duration-500 space-x-[6px]'>
                  <button className='bg-red-500 px-[10px] py-[2px] hover:scale-[1.02] rounded-md' onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                  <button className=' bg-slate-50 text-gray-800 px-[10px] py-[2px] hover:scale-[1.02] rounded-md'  onClick={() => handleEditTodo(todo.id, todo.todo)}>Edit</button>
                  <button className=' bg-slate-50 text-gray-800 px-[10px] py-[2px] hover:scale-[1.02] rounded-md' onClick={() => handleToggleComplete(todo.id)}>
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
      </div>
    );
}
