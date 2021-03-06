
import { TaskValidators } from '../../task-validators/task-validators';
import { BadTaskInputError } from '../../common/bad-task-input-error';
import { TaskError } from '../../common/task-error';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Http } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: '',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  newTask;
  validatorsArray = [Validators.required, Validators.minLength(3)];

  form = new FormGroup({
    _id: new FormGroup({
      $oid: new FormControl()
    }),
    category: new FormControl("", this.validatorsArray),
    description: new FormControl("", this.validatorsArray),
    dueDate: new FormControl("", [this.validatorsArray[0], TaskValidators.dateValidator]),
    reminderDate: new FormControl("", [this.validatorsArray[0], TaskValidators.dateValidator])
  }, TaskValidators.checkDates);

  constructor(private service:TasksService, private router:Router) { }

  createTask(){    
    this.service.createTask(this.form.value)
    .subscribe(
      (task) => {
        this.newTask = task;    // for testing purpose
        this.router.navigate(['/tasks']);
      }, 
      (error:TaskError) => {
        if(error instanceof BadTaskInputError){
          alert("This task has bad inputs");
        }
        else throw error    
    });
  }

  get category(){
    return this.form.get('category');
  }
  get description(){
    return this.form.get('description');
  }
  get dueDate(){
    return this.form.get('dueDate');
  }
  get reminderDate(){
    return this.form.get('reminderDate');
  }
}
