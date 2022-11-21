import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRepuestoComponent } from './crud-repuesto.component';

describe('CrudRepuestoComponent', () => {
  let component: CrudRepuestoComponent;
  let fixture: ComponentFixture<CrudRepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRepuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
