import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text: string = '';
  constructor(private todosService: TodosService) {
    this.todosService.todos$.subscribe((todos) => {
      console.log('todos', todos);
    });
  }

  changeText(event: Event): void {
    // cause event and target are generic elements we need to specify as input element for typescript
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    console.log(this.text);
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
