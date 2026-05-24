import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/tasks';

  // estado local em signals
  private readonly _tasks = signal<Task[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // públicos readonly
  readonly tasks = this._tasks.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // computeds
  readonly totalTasks = computed(() => this._tasks().length);
  readonly completedTasks = computed(
    () => this._tasks().filter((t) => t.status === 'completed').length,
  );
  readonly pendingTasks = computed(
    () => this._tasks().filter((t) => t.status === 'pending').length,
  );
  readonly inProgressTasks = computed(
    () => this._tasks().filter((t) => t.status === 'in-progress').length,
  );

  // GET /tasks
  loadTasks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this._tasks.set(tasks);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Erro ao carregar tarefas');
        this._loading.set(false);
        console.error(err);
      },
    });
  }

  // POST /tasks
  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask = { ...task, createdAt: new Date().toISOString() };

    this.http.post<Task>(this.apiUrl, newTask).subscribe({
      next: (created) => {
        this._tasks.update((tasks) => [...tasks, created]);
      },
      error: (err) => {
        this._error.set('Erro ao criar tarefa');
        console.error(err);
      },
    });
  }

  // PATCH /tasks/:id
  updateTask(id: string, changes: Partial<Task>): void {
    this.http.patch<Task>(`${this.apiUrl}/${id}`, changes).subscribe({
      next: (updated) => {
        this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? { ...t, ...updated } : t)));
      },
      error: (err) => {
        this._error.set('Erro ao atualizar tarefa');
        console.error(err);
      },
    });
  }

  // DELETE /tasks/:id
  deleteTask(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
      },
      error: (err) => {
        this._error.set('Erro ao deletar tarefa');
        console.error(err);
      },
    });
  }

  completeTask(id: string): void {
    this.updateTask(id, { status: 'completed' });
  }
}
