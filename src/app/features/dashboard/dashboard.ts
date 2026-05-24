import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../core/services/task';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private readonly taskService = inject(TaskService);

  readonly totalTasks = this.taskService.totalTasks;
  readonly completedTasks = this.taskService.completedTasks;
  readonly pendingTasks = this.taskService.pendingTasks;
  readonly inProgressTasks = this.taskService.inProgressTasks;
  readonly loading = this.taskService.loading;
  readonly error = this.taskService.error;

  ngOnInit(): void {
    this.taskService.loadTasks();
  }
}