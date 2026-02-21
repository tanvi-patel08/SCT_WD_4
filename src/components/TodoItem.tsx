import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, Edit2, Check, X, Calendar, Clock } from 'lucide-react';
import { Todo } from '../types';
import { DoodleButton } from './DoodleButton';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newDate?: string, newTime?: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState(todo.date || '');
  const [editTime, setEditTime] = useState(todo.time || '');

  const handleSave = () => {
    onEdit(todo.id, editText, editDate, editTime);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditDate(todo.date || '');
    setEditTime(todo.time || '');
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative group mb-3 p-4 ${todo.completed ? 'opacity-80' : ''} ${todo.color || 'bg-white'} shadow-sm`}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-8 h-8 border-2 border-black rounded-sm flex items-center justify-center transition-colors ${
            todo.completed ? 'bg-green-400' : 'bg-transparent hover:bg-black/5'
          }`}
        >
          {todo.completed && <Check size={20} strokeWidth={3} className="text-black" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black/20 focus:border-black outline-none font-hand text-xl"
                autoFocus
              />
              <div className="flex gap-2">
                <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded border border-black/10">
                  <Calendar size={14} />
                  <input 
                    type="date" 
                    value={editDate} 
                    onChange={(e) => setEditDate(e.target.value)}
                    className="bg-transparent outline-none text-sm font-mono"
                  />
                </div>
                <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded border border-black/10">
                  <Clock size={14} />
                  <input 
                    type="time" 
                    value={editTime} 
                    onChange={(e) => setEditTime(e.target.value)}
                    className="bg-transparent outline-none text-sm font-mono"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <DoodleButton variant="success" onClick={handleSave} icon={Check} className="h-8 w-8 !p-0" />
                <DoodleButton variant="danger" onClick={handleCancel} icon={X} className="h-8 w-8 !p-0" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className={`font-hand text-xl leading-snug break-words ${todo.completed ? 'line-through decoration-2 decoration-black/50' : ''}`}>
                {todo.text}
              </p>
              {(todo.date || todo.time) && (
                <div className="flex gap-3 text-sm text-gray-600 font-doodle font-bold tracking-wider ml-4">
                  {todo.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {todo.date}
                    </span>
                  )}
                  {todo.time && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {todo.time}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <DoodleButton variant="ghost" onClick={() => setIsEditing(true)} icon={Edit2} className="h-8 w-8 !p-0" />
            <DoodleButton variant="ghost" onClick={() => onDelete(todo.id)} icon={Trash2} className="h-8 w-8 !p-0 text-red-500 hover:text-red-700" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
