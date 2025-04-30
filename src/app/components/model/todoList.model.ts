import { Todo } from "./todo.model";

export class TodoList{
    constructor(
        public title: string,
        public todoList: Todo[],
        public readonly createdAt: Date,
        public updatedAt: Date,
        public id?: number,
        public folderId?: number
    ){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}