import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService extends Dexie {
  todos!: Table<Todo, number>; // Table<Todo, KeyType>

  constructor() {
    super('LocalAppDatabase'); // DB Name
    this.version(1).stores({
      todos: '++id, title, completed'  // Schema
    });
  }

  // CRUD Operations
  addTodo(todo: Todo) {
    return this.todos.add(todo);
  }

  getTodos() {
    return this.todos.toArray();
  }

  updateTodo(id: number, changes: Partial<Todo>) {
    return this.todos.update(id, changes);
  }

  deleteTodo(id: number) {
    return this.todos.delete(id);
  }
}
