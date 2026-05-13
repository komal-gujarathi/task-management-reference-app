import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private readonly apiUrl = 'http://localhost:5164/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }
  createTask(request: { title: string; assignedTo?: string }) {
  return this.http.post<TaskItem>(this.apiUrl, request);
}
}