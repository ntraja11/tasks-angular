import { ErrorHandler } from '@angular/core';

export class TaskErrorHandler implements ErrorHandler{
    handleError(error){
        alert("An unexpected error occurs");
        console.log(error);
    }
}