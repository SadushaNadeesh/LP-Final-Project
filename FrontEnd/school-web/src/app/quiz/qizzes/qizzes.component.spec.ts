import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QizzesComponent } from './qizzes.component';

describe('QizzesComponent', () => {
  let component: QizzesComponent;
  let fixture: ComponentFixture<QizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
