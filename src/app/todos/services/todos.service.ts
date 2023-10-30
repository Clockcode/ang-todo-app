import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable()
export class TodosService {
  // This subject is ideal when you want to maintain and provide a "current value" to subscribers.
  // When a new observer subscribes to a BehaviorSubject, it immediately receives the current value (or the last value that was emitted).
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    console.log('isCompleted', isCompleted);
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        // isCompleted is overriding the isCompleted property on the new object with the value of the isCompleted variable.
        isCompleted,
      };
    });
    // next method pushes updatedTodos as the new value of todos$
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }
}
