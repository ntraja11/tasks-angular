import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: '',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    tasks:any[];
  
    constructor(private service:TasksService, private router:Router) { }
    
    ngOnInit() {
      this.service.getTasksList()
        .subscribe(response => {
          this.tasks = response.json();
        })
    }

    taskOptions(task){
      this.router.navigate(['/edit-task/', task._id.$oid]);
    }
  
}
