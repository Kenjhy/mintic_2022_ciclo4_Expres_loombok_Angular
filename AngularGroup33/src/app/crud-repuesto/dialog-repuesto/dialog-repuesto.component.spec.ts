import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRepuestoComponent } from './dialog-repuesto.component';

describe('DialogRepuestoComponent', () => {
  let component: DialogRepuestoComponent;
  let fixture: ComponentFixture<DialogRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRepuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
