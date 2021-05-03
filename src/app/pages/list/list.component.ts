import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';
// import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private toDoService: ToDoService) { }
  todo: Observable<ToDo[]>
  displayedColumns: string[] = ['Name', 'Date', 'Priority', 'Status'];

  dataSource = new MatTableDataSource();

  async ngOnInit() {
    await this.toDoService.getToDoNotDone().subscribe(toDo => this.dataSource.data = toDo);
    console.log(this.dataSource)
  }


  public onValChange(val: string, todo:ToDo, id: string) {
    todo.status = val;
    this.toDoService.onAddToDo(todo, id);
  }
  test(){
    console.log(this.dataSource.data)
  }
}
