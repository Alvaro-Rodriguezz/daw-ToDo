import { Component, OnInit } from '@angular/core';;
import { ToDoService } from 'src/app/services/to-do.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToDo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private toDoService: ToDoService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  todo: ToDo = {
    id: "",
    name: "",
    description: "",
    status: "",
    date: "",
    priority: 0
  };
  selectFormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
  }



  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);


  priorityNumber: number = 0;


  onAddToDo(){
    if(this.descriptionFormControl.valid && this.nameFormControl.valid){
      this.todo.name = this.nameFormControl.value;
      this.todo.description = this.descriptionFormControl.value;
      this.todo.status = "Pending";
      this.todo.date = new Date().toLocaleString();
      this.todo.priority = this.priorityNumber;
      this.toDoService.onAddToDo(this.todo, null);
      this.nameFormControl.reset();
      this.descriptionFormControl.reset();
      this.priorityNumber = 0;
      this.snackBar.open('Added succedfully', '', {
        duration: 3000,
        panelClass: ['simple-snack-bar']
      });
      this.router.navigateByUrl('/list');
    }
  }

}
