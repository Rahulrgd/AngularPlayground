import { Component } from '@angular/core';
import { Todo } from '../model/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[] = [
    {
      title: "Complete Typescript Tutorial",
      description: "Make list of important topics and complete them one by one.",
      date: new Date()
    },
    {
      title: "Read Angular Docs",
      description: "Focus on standalone components and routing setup.",
      date: new Date(new Date().setDate(new Date().getDate() - 1))
    },
    {
      title: "Build a Counter App",
      description: "Use Angular basics: binding, event handling, and components.",
      date: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    {
      title: "Watch RxJS Basics Video",
      description: "Understand observables and simple operators.",
      date: new Date(new Date().setDate(new Date().getDate() - 3))
    },
    {
      title: "Practice Angular Forms",
      description: "Try both template-driven and reactive forms.",
      date: new Date(new Date().setDate(new Date().getDate() - 4))
    },
    {
      title: "Make a Todo App",
      description: "Add, display, and delete todo items using a list.",
      date: new Date(new Date().setDate(new Date().getDate() - 5))
    },
    {
      title: "Learn Angular Services",
      description: "Create and inject a service to manage todos.",
      date: new Date(new Date().setDate(new Date().getDate() - 6))
    },
    {
      title: "Explore Angular CLI",
      description: "Use CLI to generate components and services quickly.",
      date: new Date(new Date().setDate(new Date().getDate() - 7))
    },
    {
      title: "Understand Routing Guards",
      description: "Apply `canActivate` to protect routes.",
      date: new Date(new Date().setDate(new Date().getDate() - 8))
    },
    {
      title: "Deploy Angular App",
      description: "Try hosting on Firebase or GitHub Pages.",
      date: new Date(new Date().setDate(new Date().getDate() - 9))
    }
  ];

  newTodo = {
    title: '',
    description: ''
  }

  addTodo(): void{
    this.todos.push(
      {
        title: this.newTodo.title,
        description: this.newTodo.description,
        date: new Date()
      }
    );
    console.log("todo is added");
  }

  deleteTodo(index: number): void {
    this.todos.splice(index, 1);
  }
  
}
