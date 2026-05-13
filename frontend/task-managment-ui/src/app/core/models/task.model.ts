export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
}