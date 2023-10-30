import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  // Hides or displays the footer
  noTodoClass$: Observable<boolean>;
  // Stores the number of active todos
  activeCount$!: Observable<number>;
  // Stores string for todo text
  itemsLeftText$!: Observable<string>;
  // displays a filter
  constructor(private todosService: TodosService) {
    // Returns the number of active todos
    this.activeCount$! = todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );

    // Checks and returns true if no todo is added
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    // Returns 's' based on todo count
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount$) => `item${activeCount$ <= 1 ? '' : 's'} left`)
    );
  }
}
