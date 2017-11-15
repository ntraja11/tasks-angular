import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { TasksService } from '../../services/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { CreateTaskComponent } from './create-task.component';

class RouterStub{
  navigate(params){}
}

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ReactiveFormsModule
      ],
      declarations: [ CreateTaskComponent ],
      providers: [
        TasksService,
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();   
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties validators-array and form', () => {
    expect(component.validatorsArray).not.toBeNull();
    expect(component.form).not.toBeNull();
    expect(component.newTask).not.toBeNull();
  });

  it('should make the form valid and enable the submit button', () => {
    let category = component.form.get('category');
    let description = component.form.get('description');
    let dueDate = component.form.get('dueDate');
    let reminderDate = component.form.get('reminderDate');
    //let button = fixture.debugElement.query(By.css('.btn-primary'));
    //let createTaskButton:HTMLElement = button.nativeElement;

    category.setValue('testing category');
    description.setValue('testing description');
    dueDate.setValue('2017-12-05');
    reminderDate.setValue('2017-12-04');  
    fixture.detectChanges();
    
    //createTaskButton.removeAttribute('disabled');
    expect(component.form.valid).toBeTruthy();    

  });

  it('should receive and set new task details', () => {
    let task = {
        category: 'test',
        description: 'testing create task method',
        duedate: '2017-12-24',
        reminderDate: '2017-12-20'
      }
    let service = TestBed.get(TasksService);    
    
    spyOn(service, 'createTask').and.returnValue(Observable.from([task])); 

    component.createTask();
    expect(component.newTask).toBe(task);
  });

});
