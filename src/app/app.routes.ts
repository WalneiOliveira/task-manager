import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/task-list/task-list').then((m) => m.TaskList),
  },
];
