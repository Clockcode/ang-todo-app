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
  constructor(private todosService: TodosService) {
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
}
