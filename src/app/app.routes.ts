import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CounterComponent } from './components/counter/counter.component';
import { NotesComponent } from './components/notes-folder/note-list/notes/notes.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NotesFolderComponent } from './components/notes-folder/notes-folder.component';

export const routes: Routes = [
    {path: '', component: TodoComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'counter', component: CounterComponent},
    {path: 'notesfolder', component: NotesFolderComponent},
    {path: 'notes', component: NotesComponent},
    {path: 'calendar', component: CalendarComponent}
];
