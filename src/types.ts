import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date?: string;
  time?: string;
  color?: string; // For sticky note color variation
  rotation?: number; // For random rotation
}

export interface DoodleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: LucideIcon;
}
