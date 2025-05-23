// todo.model.ts
export class Todo {
  public readonly createdAt: Date;
  public updatedAt: Date;
  public completed: boolean;
  public id?: number; // optional

  constructor(
    public title: string,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.completed = false;
  }
}
