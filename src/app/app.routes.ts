import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CounterComponent } from './components/counter/counter.component';

export const routes: Routes = [
    {path: '', component: TodoComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'counter', component: CounterComponent}
];
