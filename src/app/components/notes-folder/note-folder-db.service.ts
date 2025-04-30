// src/app/services/note-folder-db.service.ts
import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { NotesFolder } from '../model/notesFolder.model';
import { NoteList } from '../model/noteList.model';
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteFolderDbService extends Dexie {
  folders!: Table<NotesFolder, number>;
  noteLists!: Table<NoteList, number>;
  notes!: Table<Note, number>;

  constructor() {
    super('NoteFolderDatabase');

    this.version(1).stores({
      folders: '++id, folderName, createdAt, updatedAt',
      noteLists: '++id, name, createdAt, updatedAt',
      notes: '++id, title, createdAt, updatedAt'
    });

    this.version(2).stores({
      folders: '++id, folderName, createdAt, updatedAt',
      noteLists: '++id, name, createdAt, updatedAt, folderId',
      notes: '++id, title, createdAt, updatedAt, noteListId' // ✅ Include this
    });
    
    

    this.folders = this.table('folders');
    this.noteLists = this.table('noteLists');
    this.notes = this.table('notes');
  }

  // FOLDER METHODS
  async addFolder(folder: NotesFolder): Promise<number> {
    // folder.createdAt = new Date();
    folder.updatedAt = new Date();
    return await this.folders.add(folder);
  }

  async getFolders(): Promise<NotesFolder[]> {
    return await this.folders.toArray();
  }

  async updateFolder(id: number, folderName: string): Promise<void> {
    await this.folders.update(id, { folderName, updatedAt: new Date() });
  }

  async deleteFolder(id: number): Promise<void> {
    await this.folders.delete(id);
    const listsToDelete = await this.noteLists.where('folderId').equals(id).toArray();
    for (const list of listsToDelete) {
      await this.deleteNoteList(list.id!);
    }
  }

  // NOTE LIST METHODS
  async addNoteList(folderId: number, list: NoteList): Promise<number> {
    // list.createdAt = new Date();
    list.updatedAt = new Date();
    (list as any).folderId = folderId; // Soft relationship
    return await this.noteLists.add(list);
  }

  async getNoteLists(folderId: number): Promise<NoteList[]> {
    return await this.noteLists.where('folderId').equals(folderId).toArray();
  }

  async getNoteListById(noteListId: number): Promise<NoteList | undefined> {
    return await this.noteLists.get(noteListId);
  }  

  async updateNoteList(id: number, name: string): Promise<void> {
    await this.noteLists.update(id, { name, updatedAt: new Date() });
  }

  async deleteNoteList(id: number): Promise<void> {
    await this.noteLists.delete(id);
    const notesToDelete = await this.notes.where('noteListId').equals(id).toArray();
    for (const note of notesToDelete) {
      await this.notes.delete(note.id!);
    }
  }

  // NOTE METHODS
  async addNote(noteListId: number, note: Note): Promise<number> {
    note.noteListId = noteListId;
    note.updatedAt = new Date();
    return await this.notes.add(note);
  }
  

  async getNotes(listId: number): Promise<Note[]> {
    return await this.notes.where('noteListId').equals(listId).toArray();
  }

  async updateNote(id: number, title: string, description: string): Promise<void> {
    await this.notes.update(id, { title, description, updatedAt: new Date() });
  }

  async deleteNote(id: number): Promise<void> {
    await this.notes.delete(id);
  }
}
