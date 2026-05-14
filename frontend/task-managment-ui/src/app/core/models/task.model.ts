export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  clientName?: string;
  raisedBy?: string;
  raisedDate: string;
  assignedTo?: string;
  dueDate?: string;
  priority: string;
  category: string;
  status: string;
}