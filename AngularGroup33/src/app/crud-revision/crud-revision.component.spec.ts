import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRevisionComponent } from './crud-revision.component';

describe('CrudRevisionComponent', () => {
  let component: CrudRevisionComponent;
  let fixture: ComponentFixture<CrudRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
