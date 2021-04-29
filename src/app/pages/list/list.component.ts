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
    this.todo = this.toDoService.todo;
    console.log(this.todo)
  }

  gridsize: number = 0;
  updateSetting(event) {
    this.gridsize = event.value;
  }
}
