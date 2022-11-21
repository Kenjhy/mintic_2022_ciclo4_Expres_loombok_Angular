import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSedeComponent } from './dialog-sede.component';

describe('DialogSedeComponent', () => {
  let component: DialogSedeComponent;
  let fixture: ComponentFixture<DialogSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSedeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
