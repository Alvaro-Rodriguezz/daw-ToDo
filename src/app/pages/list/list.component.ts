import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private toDoService: ToDoService) { }
  todo: Observable<ToDo[]>

  ngOnInit(): void {
    this.todo = this.toDoService.getToDoNotDone();
    console.log(this.todo)
    this.selectedVal ='option1';
  }

  public selectedVal: string;

  public onValChange(val: string, todo:ToDo, id: string) {
    this.selectedVal = val;
    todo.status = val;
    console.log(todo);
    
    //this.toDoService.onAddToDo(todo, id);
    console.log("group")
  }
}
