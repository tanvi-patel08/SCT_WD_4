import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface DoodleTimePickerProps {
  time: string;
  onChange: (time: string) => void;
  className?: string;
}

export const DoodleTimePicker: React.FC<DoodleTimePickerProps> = ({ time, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse time or default to current time rounded to nearest 15 min
  const [hours, setHours] = useState(() => {
    if (time) return parseInt(time.split(':')[0]);
    const now = new Date();
    return now.getHours();
  });
  const [minutes, setMinutes] = useState(() => {
    if (time) return parseInt(time.split(':')[1]);
    const now = new Date();
    return Math.round(now.getMinutes() / 5) * 5;
  });

  useEffect(() => {
    if (time) {
      setHours(parseInt(time.split(':')[0]));
      setMinutes(parseInt(time.split(':')[1]));
    }
  }, [time]);

  const handleTimeChange = (h: number, m: number) => {
    const newHours = Math.max(0, Math.min(23, h));
    const newMinutes = Math.max(0, Math.min(59, m));
    setHours(newHours);
    setMinutes(newMinutes);
    onChange(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (h: number, m: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 bg-white/40 px-3 py-1 rounded-sm border border-black/10 hover:border-black/30 transition-colors w-full text-left",
          isOpen && "border-black/30 bg-white/60"
        )}
      >
        <Clock size={16} className="text-gray-500" />
        <span className={cn("font-mono text-sm", !time && "text-gray-400")}>
          {time ? formatTime(hours, minutes) : "Select time"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="absolute top-full left-0 mt-2 z-50 p-4 bg-[#fdfbf7] border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] min-w-[200px]"
            style={{
              backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px), linear-gradient(90deg, #e1e1e1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
             {/* Tape effect */}
             <div className="absolute -top-3 right-1/2 translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border-l border-r border-white/60 -rotate-2 shadow-sm" />

            <div className="flex items-center justify-center gap-4 font-marker text-2xl">
              {/* Hours */}
              <div className="flex flex-col items-center gap-2">
                <button 
                  type="button"
                  onClick={() => handleTimeChange(hours + 1, minutes)}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
                <div className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black rounded-lg shadow-sm">
                  {hours.toString().padStart(2, '0')}
                </div>
                <button 
                  type="button"
                  onClick={() => handleTimeChange(hours - 1, minutes)}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              <span className="text-2xl font-bold pb-2">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center gap-2">
                <button 
                  type="button"
                  onClick={() => handleTimeChange(hours, minutes + 5)}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
                <div className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black rounded-lg shadow-sm">
                  {minutes.toString().padStart(2, '0')}
                </div>
                <button 
                  type="button"
                  onClick={() => handleTimeChange(hours, minutes - 5)}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-hand text-sm font-bold bg-black text-white px-4 py-1 rounded-full hover:scale-105 transition-transform"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
