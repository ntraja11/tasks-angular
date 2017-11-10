import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TaskValidators{
    static dateValidator(control:AbstractControl):ValidationErrors | null{
        let now = new Date();
        let date = new Date(control.value as string);

        if(date < now)
            return {inValidDate: true};
        return null;       
    }

    static checkDates(control:AbstractControl):ValidationErrors | null{
        let dueDate = new Date(control.get('dueDate').value as string);
        let reminderDate = new Date(control.get('reminderDate').value as string);

        if(dueDate <= reminderDate)
            return {inValidDates:true};        
        return null
    }
}
