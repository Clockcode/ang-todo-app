import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable, filter, map } from 'rxjs';
import { FilterEnum } from 'src/app/todos/types/filter.enum';

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

  // Stores filters that are imported into the component
  filterEnum = FilterEnum;

  // Stores filter value
  filter$!: Observable<FilterEnum>;
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

    this.filter$ = this.todosService.filter$;
  }
  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
