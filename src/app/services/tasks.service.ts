import { Config } from 'codelyzer';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TasksService {
  tasks:any[];
  private config = {params:{apiKey:"c7CC9G_bN_JohbYY9DKIi5__KBOYaVkr"}};
  private tasksUrl = 'https://api.mongolab.com/api/1/databases/ntraja-db/collections/TaskList';

  constructor(private http:Http) { }

  getTasksList(){
    return this.http.get(this.tasksUrl, this.config);
  }

  getTask(taskId){    
    return this.http.get(this.tasksUrl + "/" + taskId, this.config);    
  }

  createTask(task){
    return this.http.post(this.tasksUrl, task, this.config);
  }

  editTask(task, taskId){
    return this.http.put(this.tasksUrl + "/" + taskId, task, this.config);
  }

  deleteTask(taskId){
    return this.http.delete(this.tasksUrl + "/" + taskId, this.config);
  }

}
