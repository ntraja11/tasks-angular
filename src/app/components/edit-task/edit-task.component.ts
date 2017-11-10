import { TaskValidators } from '../../task-validators/task-validators';
import { TaskError } from '../../common/task-error';
import { TaskNotFoundError } from '../../common/task-not-found-error';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/observable/throw';

@Component({
  selector: '',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task:any = {};
  validatorsArray = [Validators.required, Validators.minLength(3)];

  editForm = new FormGroup({
    _id: new FormGroup({
      $oid: new FormControl()
    }),
    category: new FormControl("", this.validatorsArray),
    description: new FormControl("", this.validatorsArray),
    dueDate: new FormControl("", [this.validatorsArray[0], TaskValidators.dateValidator]),
    reminderDate: new FormControl("", [this.validatorsArray[0], TaskValidators.dateValidator])
  }, TaskValidators.checkDates);

  constructor(private service:TasksService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {                
        this.service.getTask(params.get('taskId'))
          .subscribe( 
            (task) => {
              this.editForm.setValue(task);              
            }, error => {
              this.navigateToTasks();
              throw error;              
            });
      });
  }

  editTask(event){
    if(event.target.name === 'edit'){
      this.service.editTask(this.editForm.value)
      .subscribe(task => {
        this.navigateToTasks()
      });
    }
    else{
      this.service.deleteTask(this.editForm.value._id.$oid)
      .subscribe(
        () => { this.navigateToTasks(); },
        (error:TaskError) => {
          if(error instanceof TaskNotFoundError){
            alert("This task has already been deleted");            
          }
          else throw error
          this.navigateToTasks();          
        });        
    }        
  }

  navigateToTasks(){
    this.router.navigate(['/tasks']);
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
