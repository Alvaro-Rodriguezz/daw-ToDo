import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  constructor(private toDoService: ToDoService) { }

  todo: Observable<ToDo[]>
  ngOnInit(): void {
    this.todo = this.toDoService.getToDoDone();
  }

}
