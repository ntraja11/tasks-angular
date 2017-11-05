import { RouterModule } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TaskNavbarComponent } from './components/task-navbar/task-navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskNavbarComponent,
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component: TasksComponent
      },
      {
        path:'tasks',
        component: TasksComponent
      },
      {
        path:'create-task',
        component: CreateTaskComponent
      },
      {
        path:'edit-task/:taskId',
        component: EditTaskComponent
      }
    ])
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
