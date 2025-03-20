
import React from 'react';
import { Check, Trash } from 'lucide-react';
import { Task } from '../types';
import { api } from '../lib/api';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
  // Toggle task completion status
  const handleToggleStatus = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await api.toggleTaskStatus(task.id);
    onUpdate();
  };

  // Delete task
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await api.deleteTask(task.id);
    onUpdate();
  };

  return (
    <div 
      className={`task-card animate-scale-in ${task.completed ? 'opacity-70' : ''}`}
      style={{ animationDelay: `${parseInt(task.id, 36) % 10 * 50}ms` }}
    >
      <div className="flex items-start gap-3">
        <button
          className={`checkbox-apple mt-1 flex-shrink-0 ${task.completed ? 'checked' : ''}`}
          onClick={handleToggleStatus}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-medium mb-1 ${task.completed ? 'line-through text-apple-text-secondary' : ''}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm text-apple-text-secondary mb-2 ${task.completed ? 'line-through opacity-70' : ''}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-apple-text-secondary mt-2">
            {task.dueDate && (
              <span className="bg-apple-gray/50 rounded-full px-2 py-0.5">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            
            {task.priority && (
              <span className={`rounded-full px-2 py-0.5 ${
                task.priority === 'high' 
                  ? 'bg-red-100 text-red-600' 
                  : task.priority === 'medium' 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-green-100 text-green-600'
              }`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="p-1.5 text-apple-text-secondary hover:text-destructive rounded-full hover:bg-destructive/10 transition-colors"
          aria-label="Delete task"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
