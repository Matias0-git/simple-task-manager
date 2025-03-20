
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { api } from '../lib/api';
import { Task, Filter } from '../types';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [showForm, setShowForm] = useState(false);
  
  // Fetch tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    const response = await api.getTasks();
    
    if (!response.error) {
      // Sort tasks by createdAt (newest first)
      setTasks(response.data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
    
    setIsLoading(false);
  };
  
  // Initial load
  useEffect(() => {
    fetchTasks();
  }, []);
  
  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  // Task counts for filter badges
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  
  return (
    <div className="max-w-3xl mx-auto px-4 pb-10">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === 'all' 
                ? 'bg-apple-blue text-white' 
                : 'bg-white text-apple-text hover:bg-white/80'
            }`}
          >
            All
            <span className="ml-1 text-xs opacity-80">{tasks.length}</span>
          </button>
          
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === 'active' 
                ? 'bg-apple-blue text-white' 
                : 'bg-white text-apple-text hover:bg-white/80'
            }`}
          >
            Active
            <span className="ml-1 text-xs opacity-80">{activeTasks}</span>
          </button>
          
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === 'completed' 
                ? 'bg-apple-blue text-white' 
                : 'bg-white text-apple-text hover:bg-white/80'
            }`}
          >
            Completed
            <span className="ml-1 text-xs opacity-80">{completedTasks}</span>
          </button>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-apple flex items-center gap-1 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>
      
      {showForm && (
        <div className="mb-6">
          <TaskForm 
            onTaskAdded={() => {
              fetchTasks();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="task-card animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-apple-gray"></div>
                <div className="flex-1">
                  <div className="h-5 bg-apple-gray rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-apple-gray rounded w-1/2 opacity-70"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onUpdate={fetchTasks}
              />
            ))
          ) : (
            <div className="task-card text-center py-6">
              <p className="text-apple-text-secondary">
                {filter === 'all' 
                  ? "You don't have any tasks yet." 
                  : filter === 'active' 
                    ? "You don't have any active tasks." 
                    : "You don't have any completed tasks."}
              </p>
              {filter === 'all' && !showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 btn-apple-secondary inline-flex items-center gap-1"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Your First Task</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
