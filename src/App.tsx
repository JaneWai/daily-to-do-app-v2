import React, { useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import { Todo } from './types/todo';
import { Sun } from 'lucide-react';

function App() {
  const { todos, addTodo, toggleComplete, deleteTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TodoForm addTodo={addTodo} />
            
            <div className="bg-white rounded-lg shadow-md p-5 border border-amber-100 fade-in">
              <div className="flex items-center text-amber-700 mb-3">
                <Sun className="h-5 w-5 mr-2 text-amber-500 rotate-animation" />
                <h3 className="font-medium">Daily Motivation</h3>
              </div>
              <p className="text-sm text-amber-700 italic">
                "The way to get started is to quit talking and begin doing."
              </p>
              <p className="text-xs text-right mt-2 text-amber-500">— Walt Disney</p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <TodoFilter filter={filter} setFilter={setFilter} />
            <TodoList 
              todos={filteredTodos} 
              toggleComplete={toggleComplete} 
              deleteTodo={deleteTodo} 
            />
          </div>
        </div>
        
        <footer className="mt-12 text-center text-amber-600 text-sm fade-in">
          <p>Daily Task Manager &copy; {new Date().getFullYear()}</p>
          <p className="text-xs mt-1 text-amber-500">Organize your day, achieve your goals</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
