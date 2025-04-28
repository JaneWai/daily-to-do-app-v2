import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the JSON and convert string dates back to Date objects
        const parsedTodos = JSON.parse(savedTodos);
        return parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (error) {
        console.error('Error parsing todos from localStorage', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo
  };
};
