import React from 'react';
import { Filter, CheckCircle, Circle, ListFilter } from 'lucide-react';

interface TodoFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-amber-100 fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-amber-700">
          <ListFilter className="h-5 w-5 mr-2 text-amber-500" />
          <span className="font-medium">Filter Tasks</span>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md text-sm flex items-center transition-all duration-200 ${
              filter === 'all'
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'text-amber-600 hover:bg-amber-50'
            }`}
          >
            <Filter className={`h-3.5 w-3.5 mr-1.5 ${filter === 'all' ? 'text-amber-500' : 'text-amber-400'}`} />
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-md text-sm flex items-center transition-all duration-200 ${
              filter === 'active'
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'text-amber-600 hover:bg-amber-50'
            }`}
          >
            <Circle className={`h-3.5 w-3.5 mr-1.5 ${filter === 'active' ? 'text-amber-500' : 'text-amber-400'}`} />
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-md text-sm flex items-center transition-all duration-200 ${
              filter === 'completed'
                ? 'bg-amber-100 text-amber-700 font-medium'
                : 'text-amber-600 hover:bg-amber-50'
            }`}
          >
            <CheckCircle className={`h-3.5 w-3.5 mr-1.5 ${filter === 'completed' ? 'text-amber-500' : 'text-amber-400'}`} />
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
