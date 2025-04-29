import { NoteList } from "./noteList.model";

export class NotesFolder {
  public readonly createdAt: Date;
  public updatedAt: Date;
  public id?: number;
  public notesList: NoteList[];
  public expanded: boolean = false; // 👈 add this

  constructor(public folderName: string) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.notesList = []; // one-to-many relation
  }

  addNoteList(noteList: NoteList) {
    this.notesList.push(noteList);
    this.updatedAt = new Date();
  }
}
