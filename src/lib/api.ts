
import { Task, ApiResponse } from '../types';
import { toast } from 'sonner';

// Since we're mocking the server for now, we'll store tasks in localStorage
const STORAGE_KEY = 'apple-tasks';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get initial data from localStorage or use empty array
const getInitialTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored tasks', e);
      return [];
    }
  }
  return [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Generate a unique ID (would normally be done server-side)
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// API Methods
export const api = {
  // Get all tasks
  async getTasks(): Promise<ApiResponse<Task[]>> {
    try {
      await delay(300); // Simulate network request
      const tasks = getInitialTasks();
      return { data: tasks, error: null };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return { data: [], error: 'Failed to fetch tasks' };
    }
  },

  // Create a new task
  async createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<ApiResponse<Task>> {
    try {
      await delay(300); // Simulate network request
      const tasks = getInitialTasks();
      
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      
      tasks.push(newTask);
      saveTasks(tasks);
      
      toast.success('Task created successfully');
      return { data: newTask, error: null };
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
      return { data: {} as Task, error: 'Failed to create task' };
    }
  },

  // Update an existing task
  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    try {
      await delay(300); // Simulate network request
      const tasks = getInitialTasks();
      
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) {
        throw new Error('Task not found');
      }
      
      const updatedTask = { ...tasks[index], ...updates };
      tasks[index] = updatedTask;
      saveTasks(tasks);
      
      toast.success('Task updated successfully');
      return { data: updatedTask, error: null };
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
      return { data: {} as Task, error: 'Failed to update task' };
    }
  },

  // Delete a task
  async deleteTask(id: string): Promise<ApiResponse<boolean>> {
    try {
      await delay(300); // Simulate network request
      const tasks = getInitialTasks();
      
      const filteredTasks = tasks.filter(task => task.id !== id);
      
      if (filteredTasks.length === tasks.length) {
        throw new Error('Task not found');
      }
      
      saveTasks(filteredTasks);
      toast.success('Task deleted successfully');
      return { data: true, error: null };
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
      return { data: false, error: 'Failed to delete task' };
    }
  },

  // Toggle task completion status
  async toggleTaskStatus(id: string): Promise<ApiResponse<Task>> {
    try {
      await delay(300); // Simulate network request
      const tasks = getInitialTasks();
      
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) {
        throw new Error('Task not found');
      }
      
      const updatedTask = { 
        ...tasks[index], 
        completed: !tasks[index].completed 
      };
      
      tasks[index] = updatedTask;
      saveTasks(tasks);
      
      return { data: updatedTask, error: null };
    } catch (error) {
      console.error('Error toggling task status:', error);
      toast.error('Failed to update task status');
      return { data: {} as Task, error: 'Failed to update task status' };
    }
  }
};
