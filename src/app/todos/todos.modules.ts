import { NgModule } from '@angular/core';

import { TodosComponent } from 'src/app/todos/components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/todos/components/header/header.component';
import { TodosService } from 'src/app/todos/services/todos.service';
import { MainTodos } from './components/main/main.component';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [TodosComponent, HeaderComponent, MainTodos, TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodosService],
})
export class TodosModule {}
