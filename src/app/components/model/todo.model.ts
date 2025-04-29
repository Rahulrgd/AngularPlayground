// todo.model.ts
export class Todo {
    constructor(
      public title: string,
      public description: string,
      public date: Date,
      public completed: boolean = false, // default value
      public id?: number // optional because db auto-generates
    ) {}
  }
  