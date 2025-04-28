import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { ListChecks, Sunrise } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-amber-600 bg-white rounded-lg shadow-md border border-amber-100 fade-in">
        <Sunrise className="h-16 w-16 mb-4 text-amber-300 pulse-animation" />
        <h3 className="text-xl font-medium mb-2">Your day looks clear</h3>
        <p className="text-sm text-amber-500">Add a new task to get started</p>
        <div className="mt-6 bg-amber-50 rounded-full px-4 py-2 text-xs text-amber-700">
          "The secret of getting ahead is getting started." — Mark Twain
        </div>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fade-in">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-amber-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-amber-700">Progress</h3>
          <span className="text-xs font-medium text-amber-600">{completedCount} of {totalCount} tasks complete</span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-2.5">
          <div 
            className={`bg-gradient-to-r from-amber-500 to-orange-400 h-2.5 rounded-full transition-all duration-500 ease-out ${percentComplete > 0 ? 'shimmer-effect' : ''}`}
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-4 stagger-fade-in">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
