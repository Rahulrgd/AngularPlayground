import { Component, OnInit } from '@angular/core';
import { NotesFolder } from '../model/notesFolder.model';
import { NoteList } from '../model/noteList.model';
import { Note } from '../model/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteFolderDbService } from './note-folder-db.service';

@Component({
  selector: 'app-notes-folder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes-folder.component.html',
  styleUrls: ['./notes-folder.component.css']
})
export class NotesFolderComponent implements OnInit {
  folderName: string = '';
  notesFolders: NotesFolder[] = [];
  showAlert: boolean = false;

  constructor(private dbService: NoteFolderDbService) {}

  async ngOnInit() {
    await this.loadFolders();
  }

  async createFolder(): Promise<void> {
    const newFolder = new NotesFolder(this.folderName);
    const folderId = await this.dbService.addFolder(newFolder);
    newFolder.id = folderId;
    this.notesFolders.push(newFolder);
    this.folderName = '';
    this.showSuccessAlert();
  }

  toggleFolder(folderId?: number): void {
    const folder = this.notesFolders.find(f => f.id === folderId);
    if (folder) folder['expanded'] = !folder['expanded'];
  }

  async addNoteList(folderId?: number): Promise<void> {
    const folder = this.notesFolders.find(f => f.id === folderId);
    if (folder) {
      const listName = prompt('Enter Note List Name:');
      if (listName && listName.length >= 3) {
        const newList = new NoteList(listName);
        const listId = await this.dbService.addNoteList(folder.id!, newList);
        newList.id = listId;
        folder.notesList.push(newList);
      }
    }
  }

  async addNote(noteList: NoteList): Promise<void> {
    const noteTitle = prompt('Enter Note Title:');
    const noteDesc = prompt('Enter Note Description:');
    if (noteTitle && noteTitle.length >= 3 && noteDesc && noteDesc.length >= 5) {
      const newNote = new Note(noteTitle, noteDesc);
      const noteId = await this.dbService.addNote(noteList.id!, newNote);
      newNote.id = noteId;
      noteList.notes.push(newNote);
    }
  }

  openNoteList(noteList: NoteList): void {
    noteList['expanded'] = !noteList['expanded'];
  }

  openNote(note: Note): void {
    alert(`Viewing Note: ${note.title}`);
  }

  async editFolder(folder: NotesFolder): Promise<void> {
    const newName = prompt('Edit Folder Name:', folder.folderName);
    if (newName && newName.length >= 3) {
      folder.folderName = newName;
      await this.dbService.updateFolder(folder.id!, newName);
    }
  }

  async deleteFolder(folderId?: number): Promise<void> {
    if (!folderId) return;
    await this.dbService.deleteFolder(folderId);
    this.notesFolders = this.notesFolders.filter(f => f.id !== folderId);
  }

  async editNoteList(noteList: NoteList): Promise<void> {
    const newName = prompt('Edit Note List Name:', noteList.name);
    if (newName && newName.length >= 3) {
      noteList.name = newName;
      await this.dbService.updateNoteList(noteList.id!, newName);
    }
  }

  async deleteNoteList(noteList: NoteList): Promise<void> {
    await this.dbService.deleteNoteList(noteList.id!);
    for (let folder of this.notesFolders) {
      folder.notesList = folder.notesList.filter(nl => nl.id !== noteList.id);
    }
  }

  async editNote(note: Note): Promise<void> {
    const newTitle = prompt('Edit Note Title:', note.title);
    const newDesc = prompt('Edit Note Description:', note.description);
    if (newTitle && newTitle.length >= 3 && newDesc && newDesc.length >= 5) {
      note.title = newTitle;
      note.description = newDesc;
      note.updatedAt = new Date();
      await this.dbService.updateNote(note.id!, newTitle, newDesc);
    }
  }

  async deleteNote(note: Note): Promise<void> {
    await this.dbService.deleteNote(note.id!);
    for (let folder of this.notesFolders) {
      for (let list of folder.notesList) {
        list.notes = list.notes.filter(n => n.id !== note.id);
      }
    }
  }

  private showSuccessAlert(): void {
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 2000);
  }

  private async loadFolders(): Promise<void> {
    this.notesFolders = await this.dbService.getFolders();
    for (const folder of this.notesFolders) {
      folder.notesList = await this.dbService.getNoteLists(folder.id!);
      for (const list of folder.notesList) {
        list.notes = await this.dbService.getNotes(list.id!);
      }
    }
  }
}
