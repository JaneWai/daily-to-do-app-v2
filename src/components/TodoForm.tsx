import React, { useState } from 'react';
import { PlusCircle, ListTodo, AlignLeft, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      targetDate,
      completed: false,
      createdAt: new Date(),
    };
    
    // Add a small delay to show the animation
    setTimeout(() => {
      addTodo(newTodo);
      setTitle('');
      setDescription('');
      setTargetDate('');
      setIsSubmitting(false);
    }, 300);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6 border border-amber-100 fade-in">
      <h2 className="text-xl font-bold mb-4 text-amber-700 flex items-center">
        <ListTodo className="h-5 w-5 mr-2 text-amber-500" />
        Add New Task
      </h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-amber-800 mb-1 flex items-center">
          <span>Title</span>
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-300"
            placeholder="What needs to be done?"
            required
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PlusCircle className="h-5 w-5 text-amber-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-amber-800 mb-1 flex items-center">
          <AlignLeft className="h-4 w-4 mr-1 text-amber-500" />
          <span>Description</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-300"
          placeholder="Add details about this task..."
          rows={3}
        />
      </div>
      
      <div className="mb-5">
        <label htmlFor="targetDate" className="block text-sm font-medium text-amber-800 mb-1 flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-amber-500" />
          <span>Target Completion Date</span>
        </label>
        <input
          type="date"
          id="targetDate"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 transition-all duration-300"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex items-center justify-center w-full bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white font-medium py-3 px-4 rounded-md transition duration-300 ease-in-out shadow-md ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        <PlusCircle className={`mr-2 h-5 w-5 ${isSubmitting ? 'rotate-animation' : ''}`} />
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;
