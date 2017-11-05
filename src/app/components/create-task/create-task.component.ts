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

  validatorsArray = [Validators.required, Validators.minLength(3)];

  form = new FormGroup({
    category: new FormControl("", this.validatorsArray),
    description: new FormControl("", this.validatorsArray),
    dueDate: new FormControl("", this.validatorsArray[0]),
    reminderDate: new FormControl("", this.validatorsArray[0])
  })

  constructor(private service:TasksService, private router:Router) { }

  createTask(){    
    this.service.createTask(this.form.value)
    .subscribe(() => {
      //console.log("After creation : " + response.json())
      //sessionStorage.setItem("tasks", response.json());
      this.router.navigate(['/tasks'])
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
