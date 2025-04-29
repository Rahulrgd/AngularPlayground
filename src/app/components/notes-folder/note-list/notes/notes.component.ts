import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesFolder } from '../../../model/notesFolder.model';
import { NoteList } from '../../../model/noteList.model';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {

  noteListFolders : NotesFolder[] = [];
  noteList : NoteList[] = [];

  newNote = {
    title: "",
    discription: "",
  }

  newFolder = {
    title: ""
  }

  addNotesFolder() {
    let notesFolder = new NotesFolder(this.newFolder.title);
    this.noteListFolders.push(notesFolder);
  }

  note = {
    title: '',
    description: ''
  };
  
  showSuccess = false;
  showError = false;
  
  submitNote() {
    if (this.note.title.length >= 3 && this.note.description.length >= 5) {
      this.showSuccess = true;
      this.showError = false;
      // Save logic here
    } else {
      this.showSuccess = false;
      this.showError = true;
    }
  }
  
}
