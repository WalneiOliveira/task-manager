import { Component, signal, computed} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly totalTasks = signal(12);
  readonly completedTasks = signal(8);
  readonly pendingTasks = computed(() => this.totalTasks() - this.completedTasks());

  completeTask(): void {
    if (this.completedTasks() < this.totalTasks()) {
      this.completedTasks.update(v => v + 1);
    }
  }

  addTask(): void {
    this.totalTasks.update(v => v + 1);
  }
}
