import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRevisionComponent } from './dialog-revision.component';

describe('DialogRevisionComponent', () => {
  let component: DialogRevisionComponent;
  let fixture: ComponentFixture<DialogRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
