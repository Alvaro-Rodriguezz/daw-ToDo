import { Component, OnInit } from '@angular/core';;
import { ToDoService } from 'src/app/services/to-do.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToDo } from '../../models/todo.model';
interface Status {
  name: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private toDoService: ToDoService) { }

  todo: ToDo = {
    id: "",
    name: "",
    description: "",
    status: "",
    date: "",
    priority: 0
  };
  selectFormControl = new FormControl('', Validators.required);
  status: Status[] = [
    {name: 'In progress'},
    {name: 'Pending'}
  ];
  ngOnInit(): void {
  }

  statusControl = new FormControl('', Validators.required);


  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);


  priorityNumber: number = 0;


  onAddToDo(){
    if(this.descriptionFormControl.valid && this.nameFormControl.valid && this.statusControl.valid){
      this.todo.name = this.nameFormControl.value;
      this.todo.description = this.descriptionFormControl.value;
      this.todo.status = this.statusControl.value.name;
      this.todo.date = new Date().toUTCString();
      console.log("")
      console.log(this.statusControl.value.name);
      this.toDoService.onAddToDo(this.todo, null);
      this.nameFormControl.reset();
      this.descriptionFormControl.reset();
      this.statusControl.reset();
      this.priorityNumber = 0;
      return;
    }
    console.log(new Date().toLocaleDateString())
    console.log(Math.floor(Date.now()/1000));



  }

}
