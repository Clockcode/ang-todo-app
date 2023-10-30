import { Component, Input } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  // Used local alias todoProps to be able to differentiate read-only props from the local variables.
  // Variables with Props in the name will remind us that these variables can not be mutated.
  @Input('todo') todoProps!: TodoInterface;
}
