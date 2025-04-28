import React, { useState } from 'react';
import { Check, Calendar, Clock, Trash, Star } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isOverdue = todo.targetDate && !todo.completed && new Date(todo.targetDate) < new Date();

  const handleToggleComplete = (id: string) => {
    setIsChecking(true);
    toggleComplete(id);
    // Reset animation state after animation completes
    setTimeout(() => setIsChecking(false), 300);
  };

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    // Delay actual deletion to allow animation to complete
    setTimeout(() => deleteTodo(id), 300);
  };

  return (
    <div 
      className={`task-card bg-white rounded-lg shadow-md p-5 mb-4 border-l-4 transition-all ${
        isDeleting ? 'opacity-0 transform translate-x-10' : ''
      } ${
        todo.completed 
          ? 'border-green-500 bg-green-50/50' 
          : isOverdue
            ? 'border-orange-500'
            : 'border-amber-400'
      }`}
      style={{ transition: 'all 0.3s ease-out' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <button
              onClick={() => handleToggleComplete(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
                todo.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-amber-400 hover:border-amber-500'
              }`}
            >
              {todo.completed && (
                <Check className={`h-4 w-4 ${isChecking ? 'checkmark-animation' : ''}`} />
              )}
            </button>
            <h3 className={`text-lg font-semibold ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : isOverdue
                  ? 'text-orange-700'
                  : 'text-amber-800'
            }`}>
              {todo.title}
            </h3>
            
            {isOverdue && (
              <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium slide-in-right">
                Overdue
              </span>
            )}
          </div>
          
          {todo.description && (
            <p className={`ml-9 mb-3 text-sm ${
              todo.completed 
                ? 'text-gray-500' 
                : 'text-amber-700'
            }`}>
              {todo.description}
            </p>
          )}
          
          <div className="ml-9 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center text-amber-600">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Created: {formatDate(todo.createdAt)}</span>
            </div>
            
            {todo.targetDate && (
              <div className={`flex items-center ${
                todo.completed 
                  ? 'text-green-600' 
                  : isOverdue
                    ? 'text-orange-600 font-medium' 
                    : 'text-amber-600'
              }`}>
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Due: {new Date(todo.targetDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleDelete(todo.id)}
            className="text-amber-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
            aria-label="Delete todo"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
