/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Plus, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Confetti from 'react-confetti';
import { Todo } from './types';
import { TodoItem } from './components/TodoItem';
import { DoodleButton } from './components/DoodleButton';
import { Tape, StarDoodle, HeartDoodle, ArrowDoodle, TinyStar } from './components/Doodles';
import { DoodleDatePicker } from './components/DoodleDatePicker';
import { DoodleTimePicker } from './components/DoodleTimePicker';

const STICKY_COLORS = [
  'bg-blue-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-green-100',
  'bg-yellow-100',
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('doodle-todos');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: '1', text: 'Eat strawberries', completed: true, color: 'bg-blue-100', rotation: 0 },
      { id: '2', text: 'Finish the scrapbook page', completed: true, color: 'bg-pink-100', rotation: 0 },
      { id: '3', text: 'Call mom', completed: false, color: 'bg-blue-100', rotation: 0 },
    ];
  });

  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDate, setNewTodoDate] = useState('');
  const [newTodoTime, setNewTodoTime] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    localStorage.setItem('doodle-todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      completed: false,
      date: newTodoDate,
      time: newTodoTime,
      color: STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)],
      rotation: 0, 
    };

    setTodos([newTodo, ...todos]);
    setNewTodoText('');
    setNewTodoDate('');
    setNewTodoTime('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => {
      if (t.id === id) {
        const isCompleting = !t.completed;
        if (isCompleting) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        return { ...t, completed: isCompleting };
      }
      return t;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const editTodo = (id: string, newText: string, newDate?: string, newTime?: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText, date: newDate, time: newTime } : t));
  };

  const filteredTodos = todos
    .filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 flex justify-center items-start">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['#FFC0CB', '#FFD700', '#87CEFA', '#90EE90', '#FFA07A']}
        />
      )}
      
      {/* Main Notebook Container */}
      <div className="relative w-full max-w-2xl mx-auto perspective-1000">
        
        {/* Decorative Elements around the notebook */}
        <Tape className="-top-4 left-10 rotate-[-2deg] opacity-50" />
        
        {/* The Notebook Page */}
        <div className="notebook-paper min-h-[80vh] p-8 sm:p-12 relative shadow-2xl">
          
          {/* Header Section */}
          <header className="mb-8 relative flex items-center justify-between">
            <div className="relative">
              {/* Decorative Stars */}
              <TinyStar className="absolute -top-4 left-0 rotate-[-15deg]" />
              <TinyStar className="absolute -top-6 left-12 rotate-[10deg]" />
              <TinyStar className="absolute -top-2 left-24 rotate-[-5deg]" />
              <TinyStar className="absolute -bottom-2 -right-4 rotate-[20deg]" />
              <TinyStar className="absolute top-1/2 -right-8 rotate-[-10deg]" />
              
              <h1 className="relative font-marker text-6xl text-black tracking-wider z-10">
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4/5 bg-pink-300/60 -skew-x-6 rounded-sm -z-10 transform scale-110"></span>
                  MY TO-DO LIST
                </span>
              </h1>
            </div>

            <div className="transform rotate-3 bg-yellow-200 border border-black p-2 shadow-sm">
               <span className="font-doodle text-xl font-bold block text-center leading-none">
                 {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
               </span>
            </div>
          </header>

          {/* Controls Section */}
          <div className="mb-8 space-y-4">
            
            {/* Add Todo Form */}
            <form onSubmit={addTodo} className="relative group space-y-4">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Write a new task here..."
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-black outline-none font-hand text-2xl py-2 px-1 placeholder:text-gray-400 transition-colors"
              />
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex gap-2 w-full sm:w-auto">
                  <DoodleDatePicker 
                    date={newTodoDate} 
                    onChange={setNewTodoDate} 
                    className="w-40"
                  />
                  <DoodleTimePicker 
                    time={newTodoTime} 
                    onChange={setNewTodoTime} 
                    className="w-32"
                  />
                </div>
                <div className="flex-1"></div>
                <DoodleButton 
                  type="submit" 
                  variant="primary" 
                  disabled={!newTodoText.trim()}
                  className="w-full sm:w-auto !bg-sky-300 !border-2 !border-black !rounded-md !shadow-none hover:!shadow-none hover:!translate-y-0 active:!scale-95 font-marker text-lg"
                >
                  <Plus size={20} strokeWidth={3} /> ADD
                </DoodleButton>
              </div>
            </form>

            <hr className="border-gray-300 my-6" />

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-2">
                {(['all', 'active', 'completed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`font-hand text-lg font-bold px-4 py-1 border-2 border-black rounded-md transition-all uppercase ${
                      filter === f 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full sm:w-48 pl-10 pr-4 py-1 bg-gray-100 border border-gray-300 rounded-full font-hand focus:border-black outline-none text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="space-y-3 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-center py-12 opacity-50"
                >
                  <p className="font-hand text-2xl text-gray-500">
                    {searchQuery ? "No matching tasks found" : "No tasks yet"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer / Stats */}
          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center font-hand text-lg text-gray-400">
            <span>{todos.filter(t => !t.completed).length} tasks left</span>
            <span>{Math.round((todos.filter(t => t.completed).length / (todos.length || 1)) * 100)}% done</span>
          </div>

        </div>
      </div>
    </div>
  );
}

