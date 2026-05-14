import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskApiService } from './core/services/task-api.service';
import { TaskItem } from './core/models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Task Management App</h1>

      <form class="task-form" (ngSubmit)="createTask()">
  <input
    name="title"
    [(ngModel)]="newTaskTitle"
    placeholder="Task name"
    required
  />

  <input
    name="clientName"
    [(ngModel)]="newTaskClientName"
    placeholder="Client name"
  />

  <input
    name="raisedBy"
    [(ngModel)]="newTaskRaisedBy"
    placeholder="Raised by"
  />

  <input
    name="assignedTo"
    [(ngModel)]="newTaskAssignedTo"
    placeholder="Owner"
  />

  <div class="field">
    <label>Due Date</label>
    <input
      type="date"
      name="dueDate"
      [(ngModel)]="newTaskDueDate"
    />
  </div>

  <div class="field">
    <label>Priority</label>
    <select name="priority" [(ngModel)]="newTaskPriority">
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
  </div>

  <div class="field">
    <label>Category</label>
    <select name="category" [(ngModel)]="newTaskCategory">
      <option>General</option>
      <option>Campaign</option>
      <option>Content</option>
      <option>Design</option>
      <option>Social Media</option>
      <option>Client Review</option>
    </select>
  </div>

  <textarea
    name="description"
    [(ngModel)]="newTaskDescription"
    placeholder="Description"
  ></textarea>

  <button type="submit">Add Task</button>
  </form>

      <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>

      <div *ngIf="tasks.length === 0">
        No tasks available.
      </div>

      <div class="task-card" *ngFor="let task of tasks">
        <h3>{{ task.title }}</h3>

        <p>{{ task.description || 'No description provided.' }}</p>

        <p><strong>Client:</strong> {{ task.clientName || '-' }}</p>

        <p><strong>Raised By:</strong> {{ task.raisedBy || '-' }}</p>

        <p><strong>Raised Date:</strong>
          {{ task.raisedDate | date:'short' }}
        </p>

        <p><strong>Due Date:</strong>
          {{ task.dueDate | date:'shortDate' }}
        </p>

        <div class="meta">

          <span
            class="priority-badge"
            [ngClass]="{
              'priority-high': task.priority === 'High',
              'priority-medium': task.priority === 'Medium',
              'priority-low': task.priority === 'Low'
            }"
          >
            {{ task.priority }}
          </span>

          <span class="status-badge">
            {{ task.status }}
          </span>

          <span>
            Owner: {{ task.assignedTo || 'Unassigned' }}
          </span>

        </div>

        <div class="meta">

          <label>
            Status:
            <select [(ngModel)]="task.status" name="status-{{ task.id }}">
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </label>

          <button
            type="button"
            (click)="updateStatus(task.id, task.status)"
          >
            Update
          </button>

          <button
            type="button"
            class="delete-btn"
            (click)="deleteTask(task.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
        .container {
      padding: 32px;
      font-family: Arial, sans-serif;
      max-width: 1000px;
      margin: 0 auto;
      background-color: #f5f7fb;
      min-height: 100vh;
    }

    h1 {
      margin-bottom: 24px;
      color: #1f2937;
    }

    .task-form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    input,
    textarea,
    select {
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 14px;
    }

    textarea {
      min-height: 80px;
      grid-column: span 2;
    }

    button {
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: #2563eb;
      color: white;
      font-weight: 500;
    }

    button:hover {
      opacity: 0.9;
    }

    .task-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .task-card h3 {
      margin-top: 0;
      color: #111827;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 16px;
      align-items: center;
    }

    .priority-badge {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .priority-high {
      background-color: #fee2e2;
      color: #b91c1c;
    }

    .priority-medium {
      background-color: #fef3c7;
      color: #92400e;
    }

    .priority-low {
      background-color: #dcfce7;
      color: #166534;
    }

    .status-badge {
      padding: 4px 10px;
      border-radius: 20px;
      background-color: #dbeafe;
      color: #1d4ed8;
      font-size: 12px;
      font-weight: 600;
    }

    .delete-btn {
      background-color: #dc2626;
    }

    .error {
      color: #b00020;
    }
      .delete-btn {
        margin-left: auto;
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
  }
        .field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .field label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }
  `]
})
export class App implements OnInit {
  tasks: TaskItem[] = [];
  newTaskTitle = '';
  newTaskAssignedTo = '';
  errorMessage = '';
  newTaskDescription = '';
  newTaskClientName = '';
  newTaskRaisedBy = '';
  newTaskDueDate = '';
  newTaskPriority = 'Medium';
  newTaskCategory = 'General';

  constructor(private taskApiService: TaskApiService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskApiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks.';
      }
    });
  }

  createTask(): void {
    if (!this.newTaskTitle.trim()) {
      this.errorMessage = 'Task title is required.';
      return;
    }

    this.taskApiService.createTask({
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      clientName: this.newTaskClientName,
      raisedBy: this.newTaskRaisedBy,
      assignedTo: this.newTaskAssignedTo,
      dueDate: this.newTaskDueDate,
      priority: this.newTaskPriority,
      category: this.newTaskCategory
    }).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.newTaskClientName = '';
        this.newTaskRaisedBy = '';
        this.newTaskAssignedTo = '';
        this.newTaskDueDate = '';
        this.newTaskPriority = 'Medium';
        this.newTaskCategory = 'General';
        this.errorMessage = '';
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Unable to create task.';
      }
    });
  }
 
  updateStatus(taskId: string, status: string): void {
  this.taskApiService.updateTaskStatus(taskId, status)
    .subscribe({
      next: () => {
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Unable to update task.';
      }
    });
}

deleteTask(taskId: string): void {
  this.taskApiService.deleteTask(taskId)
    .subscribe({
      next: () => {
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Unable to delete task.';
      }
    });
}

}