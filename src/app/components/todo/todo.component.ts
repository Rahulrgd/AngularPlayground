import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalDbService } from './local-db.service';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit{

  todos: Todo[] = [];

  constructor(private db: LocalDbService) {}

  ngOnInit() {
    this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.db.getTodos();
  }
  
  

  newTodo = {
    title: '',
    description: '',
  };

  componentVisibility = false;

  showTodoAddedAlert() {
    this.componentVisibility = true;
  
    // Auto-hide after 3 seconds (optional)
    setTimeout(() => {
      this.componentVisibility = false;
    }, 3000);
  }

  async addTodo(): Promise<void> {
    const todo = new Todo(
      this.newTodo.title,
      this.newTodo.description,
      new Date()
    );
  
    await this.db.addTodo(todo);   // Save to database
    await this.loadTodos();        // Refresh list from DB
  
    console.log('Todo added to local database');
    this.showTodoAddedAlert();
  
    // Reset form fields
    this.newTodo.title = '';
    this.newTodo.description = '';
  }

  deletedTodoTitle = "";
  deleteTodoAlert= false;

  showTodoDeletedAlert() {
    this.deleteTodoAlert = true;
    // Auto-hide after 3 seconds (optional)
    console.log(this.deleteTodo);
    setTimeout(() => {
      this.deleteTodoAlert = false;
    }, 3000);
  }

  async deleteTodo(index: number, title: string): Promise<void> {
  const todoToDelete = this.todos[index];

  if (todoToDelete.id) {
    await this.db.deleteTodo(todoToDelete.id); // Delete from DB
    await this.loadTodos();                    // Refresh list
    this.deletedTodoTitle = title;
    this.showTodoDeletedAlert();
  }
}

}
