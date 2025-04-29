import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteList } from '../../model/noteList.model';
import { NoteFolderDbService } from '../note-folder-db.service';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  
}
