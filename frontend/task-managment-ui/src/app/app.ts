import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskApiService } from './core/services/task-api.service';
import { TaskItem } from './core/models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Task Management App</h1>

      <div *ngIf="tasks.length === 0">
        No tasks available.
      </div>

      <div class="task-card" *ngFor="let task of tasks">
        <h3>{{ task.title }}</h3>

        <p>{{ task.description }}</p>

        <div class="meta">
          <span>Status: {{ task.status }}</span>
          <span>Assigned To: {{ task.assignedTo || 'Unassigned' }}</span>
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
  `]
})
export class App implements OnInit {

  tasks: TaskItem[] = [];

  constructor(private taskApiService: TaskApiService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskApiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Failed to load tasks', error);
      }
    });
  }
}