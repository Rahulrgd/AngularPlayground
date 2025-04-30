import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesFolder } from '../../model/notesFolder.model';
import { NoteList } from '../../model/noteList.model';
import { Note } from './notes/note-db.service';
import { NoteFolderDbService } from '../note-folder-db.service';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  // @Input() folder!: NotesFolder;

  // constructor(private dbService: NoteFolderDbService) {}

  // async addNote(noteList: NoteList): Promise<void> {
  //   const noteTitle = prompt('Enter Note Title:');
  //   const noteDesc = prompt('Enter Note Description:');
  //   if (
  //     noteTitle &&
  //     noteTitle.length >= 3 &&
  //     noteDesc &&
  //     noteDesc.length >= 5
  //   ) {
  //     const newNote = new Note(noteTitle, noteDesc);
  //     const noteId = await this.dbService.addNote(noteList.id!, newNote);
  //     newNote.id = noteId;
  //     noteList.notes.push(newNote);
  //   }
  // }

  // openNoteList(noteList: NoteList): void {
  //   noteList['expanded'] = !noteList['expanded'];
  // }

  // async editNoteList(noteList: NoteList): Promise<void> {
  //   const newName = prompt('Edit Note List Name:', noteList.name);
  //   if (newName && newName.length >= 3) {
  //     noteList.name = newName;
  //     await this.dbService.updateNoteList(noteList.id!, newName);
  //   }
  // }

  // async deleteNoteList(noteList: NoteList): Promise<void> {
  //   await this.dbService.deleteNoteList(noteList.id!);
  //   for (let folder of this.notesFolders) {
  //     folder.notesList = folder.notesList.filter((nl) => nl.id !== noteList.id);
  //   }
  // }
}
