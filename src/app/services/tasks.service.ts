import { BadTaskInputError } from '../common/bad-task-input-error';
import { TaskNotFoundError } from '../common/task-not-found-error';
import { TaskError } from '../common/task-error';
import { error } from 'util';
import { Config } from 'codelyzer';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class TasksService {
  tasks:any[];
  private config = {params:{apiKey:"c7CC9G_bN_JohbYY9DKIi5__KBOYaVkr"}};
  private tasksUrl = 'https://api.mongolab.com/api/1/databases/ntraja-db/collections/TaskList';

  constructor(private http:Http) { }

  getTasksList(){
    return this.http.get(this.tasksUrl, this.config)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  getTask(taskId){    
    return this.http.get(this.tasksUrl + "/" + taskId, this.config)
    .map(response => response.json())
    .catch(this.errorHandler);    
  }

  createTask(task){
    return this.http.post(this.tasksUrl, task, this.config)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  editTask(task){
    return this.http.put(this.tasksUrl + "/" + task._id.$oid, task, this.config)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  deleteTask(taskId){
    return this.http.delete(this.tasksUrl + "/" + taskId, this.config)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  private errorHandler(error:Response){
    if(error.status === 400){
      return Observable.throw(new BadTaskInputError(error.json()));
    }
    if(error.status === 404){
      return Observable.throw(new TaskNotFoundError());
    }
    else{
      return Observable.throw(new TaskError(error.json()));
    }
  }
}
