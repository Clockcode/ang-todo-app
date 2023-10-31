import { Component } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';
import { Observable, combineLatest, map } from 'rxjs';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainTodos {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;
  constructor(private todosService: TodosService) {
    // Checks and returns true if every todo is completed
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    // Checks and returns true if no todo is added
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    // Returns todos that are filtered by active or compeleted
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        } else {
          return todos;
        }
      })
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
  setEditingId(editingId: string | null): void {
    console.log('editingId', editingId);
    this.editingId = editingId;
  }
}
