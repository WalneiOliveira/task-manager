import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../../core/services/task';
import { Task } from '../../../core/models/task';

@Component({
  selector: 'app-task-list',
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private readonly taskService = inject(TaskService);

  readonly tasks = this.taskService.tasks;
  readonly loading = this.taskService.loading;
  readonly error = this.taskService.error;

  readonly displayedColumns = ['title', 'priority', 'status', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  completeTask(task: Task): void {
    this.taskService.completeTask(task.id);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'Pendente',
      'in-progress': 'Em andamento',
      completed: 'Concluída',
    };
    return labels[status] ?? status;
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: 'warn',
      'in-progress': 'primary',
      completed: 'accent',
    };
    return colors[status] ?? 'primary';
  }

  getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
    };
    return labels[priority] ?? priority;
  }
}
