import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFolderComponent } from './notes-folder.component';

describe('NotesFolderComponent', () => {
  let component: NotesFolderComponent;
  let fixture: ComponentFixture<NotesFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
