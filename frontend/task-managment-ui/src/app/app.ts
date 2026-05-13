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
          placeholder="Task title"
          required
        />

        <input
          name="assignedTo"
          [(ngModel)]="newTaskAssignedTo"
          placeholder="Assigned to"
        />

        <button type="submit">Add Task</button>
      </form>

      <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>

      <div *ngIf="tasks.length === 0">
        No tasks available.
      </div>

      <div class="task-card" *ngFor="let task of tasks">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>

        <div class="meta">
          <label>
            Status:
            <select [(ngModel)]="task.status">           
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </label>

          <button (click)="updateStatus(task.id, task.status)">
            Update
          </button>

          <span>
            Assigned To: {{ task.assignedTo || 'Unassigned' }}
          </span>

          <button class="delete-btn" (click)="deleteTask(task.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
    }

    .task-form {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      flex: 1;
    }

    button {
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .task-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-top: 16px;
    }

    .meta {
      display: flex;
      gap: 24px;
      margin-top: 12px;
      font-size: 14px;
      color: #555;
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
  `]
})
export class App implements OnInit {
  tasks: TaskItem[] = [];
  newTaskTitle = '';
  newTaskAssignedTo = '';
  errorMessage = '';

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
      assignedTo: this.newTaskAssignedTo
    }).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.newTaskAssignedTo = '';
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