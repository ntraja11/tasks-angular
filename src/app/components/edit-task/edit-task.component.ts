import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: '',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  //@Input()
  task:any = {};
  validatorsArray = [Validators.required, Validators.minLength(3)];

  editForm = new FormGroup({
    category: new FormControl("", this.validatorsArray),
    description: new FormControl(this.task.description, this.validatorsArray),
    dueDate: new FormControl(this.task.dueDate, this.validatorsArray[0]),
    reminderDate: new FormControl(this.task.reminderDate, this.validatorsArray[0])
  })

  constructor(private service:TasksService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {                
        this.service.getTask(params.get('taskId'))
          .subscribe( (response) => {
            this.task = response.json();
            this.category.setValue(this.task.category);
            this.description.setValue(this.task.description);
            this.dueDate.setValue(this.task.dueDate);
            this.reminderDate.setValue(this.task.reminderDate);
          })
      });
  }

  editTask(event){
    if(event.target.name === 'edit'){
      this.service.editTask(this.editForm.value, this.task._id.$oid)
      .subscribe((response) => {        
        this.router.navigate(['/tasks'])
      });  
    }
    else{
      this.service.deleteTask(this.task._id.$oid)
      .subscribe((response) => {
        this.router.navigate(['/tasks'])
      });
    }    
    
  }

  get category(){
    return this.editForm.get('category');
  }
  get description(){
    return this.editForm.get('description');
  }
  get dueDate(){
    return this.editForm.get('dueDate');
  }
  get reminderDate(){
    return this.editForm.get('reminderDate');
  }

}
