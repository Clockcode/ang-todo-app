import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
// functionality: 1: complete todo, 2: delete todo, 3: edit todo
export class TodoComponent implements OnInit, OnChanges {
  // Used local alias todoProps to be able to differentiate read-only props from the local variables.
  // Variables with Props in the name will remind us that these variables can not be mutated.
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  editingText: string = '';
  @ViewChild('textEdit') textEdit!: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textEdit.nativeElement.focus();
      }, 0);
    }
  }
  // updates todo isCompleted property
  toggleTodo(): void {
    console.log('toggleTodo');
    this.todosService.toggleTodo(this.todoProps.id);
  }
  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }
  removeTodo(): void {
    console.log('removeTodo');
    this.todosService.removeTodo(this.todoProps.id);
  }
  changeTodo(): void {
    console.log('changeTodo', this.editingText);
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }

  setTodoInEditMode(event: Event): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }
}
