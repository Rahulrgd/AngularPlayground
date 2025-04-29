import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export class NotesDbService extends Dexie {
  notes: Dexie.Table<Note, number>;  // Table to store Notes

  constructor() {
    super('NotesDatabase'); // Define database name
    this.version(1).stores({
      notes: '++id, title, description, createdAt, updatedAt', // Define the notes table structure
    });
    this.notes = this.table('notes');
  }

  // Method to add a new note to the database
  async addNote(note: Note): Promise<number> {
    return this.notes.add(note);
  }

  // Method to get a note by its ID
  async getNoteById(id: number): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  // Method to get all notes
  async getAllNotes(): Promise<Note[]> {
    return this.notes.toArray();
  }

  // Method to update a note by its ID
  async updateNote(id: number, note: Partial<Note>): Promise<void> {
    await this.notes.update(id, note);
  }

  // Method to delete a note by its ID
  async deleteNote(id: number): Promise<void> {
    return this.notes.delete(id);
  }

  // Method to clear all notes (optional, for debugging or cleaning up)
  async clearNotes(): Promise<void> {
    return this.notes.clear();
  }
}

// Define Note class for type-checking
export class Note {
  public readonly createdAt: Date;
  public updatedAt: Date;
  public id?: number;

  constructor(
    public title: string,
    public description: string,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
