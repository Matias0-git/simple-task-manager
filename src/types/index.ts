
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export type Filter = 'all' | 'active' | 'completed';

export interface ApiResponse<T> {
  data: T;
  error: string | null;
}
