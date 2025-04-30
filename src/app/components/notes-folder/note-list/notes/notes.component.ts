import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteList } from '../../../model/noteList.model';
import { QuillModule } from 'ngx-quill';
import { ActivatedRoute } from '@angular/router';
import { NoteFolderDbService } from '../../note-folder-db.service';
import { Note } from '../../../model/note.model';

@Component({
  selector: 'app-notes',
  standalone: true, // ✅ Required when using `imports` in component
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'], // ✅ fixed typo
})
export class NotesComponent {

  noteListId: number | null = null;
  noteListName: string | null = null;
  noteList: NoteList | null = null;

  showSuccess = false;
  showError = false;

  note = {
    title: "",
    description: ""
  };

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],                      // Basic styles
      [{ 'color': [] }, { 'background': [] }],                        // Text & background color
      [{ 'align': [] }],                                              // Alignment
      ['code-block'],                                                 // Code block
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],                  // Lists
      [{ 'indent': '-1' }, { 'indent': '+1' }],                       // Indent
      ['clean']                                                       // Clear formatting
    ]
  };  

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dbService: NoteFolderDbService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      this.noteListId = +params['listId']; // Ensure it's a number
      this.noteListName = params['listName'];

      if (this.noteListId !== null && !isNaN(this.noteListId)) {
        const fetchedNoteList = await this.dbService.getNoteListById(this.noteListId);
        this.noteList = fetchedNoteList ?? null;
      } else {
        console.error('Invalid or missing noteListId');
      }
    });
  }

  async addNote(noteList: NoteList, title: string, description: string): Promise<void> {

    if(this.noteListId===null){

    }

    const noteTitle = title;
    const noteDesc = description;

    if (
      noteTitle !== null &&
      noteDesc !== null &&
      noteTitle.length >= 3 &&
      noteDesc.length >= 5
    ) {
      const newNote = new Note(noteTitle, noteDesc, noteList.id!);
      const noteId = await this.dbService.addNote(noteList.id!, newNote);
      newNote.id = noteId;
      noteList.notes.push(newNote);
    } else {
      alert('Title must be at least 3 characters and description at least 5.');
    }
  }
  

  async submitNote(): Promise<void> {
    const { title, description } = this.note;

    if (title.length >= 3 && description.length >= 5) {
      await this.addNote(this.noteList!, title, description);
      this.showSuccess = true;
      this.showError = false;
      console.log(`Title: ${title}, Description: ${description}, NoteList: ${this.noteList?.name}`);
    } else {
      this.showSuccess = false;
      this.showError = true;
    }
  }
  
}
