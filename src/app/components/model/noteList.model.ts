import { Note } from "./note.model";

export class NoteList {
  public readonly createdAt: Date;
  public updatedAt: Date;
  public id?: number;
  public notes: Note[];
  public expanded: boolean = false; // 👈 add this

  constructor(public name: string) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.notes = []; // one-to-many relation
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.updatedAt = new Date();
  }
}
