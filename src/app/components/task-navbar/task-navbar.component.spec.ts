import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNavbarComponent } from './task-navbar.component';

xdescribe('TaskNavbarComponent', () => {
  let component: TaskNavbarComponent;
  let fixture: ComponentFixture<TaskNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
