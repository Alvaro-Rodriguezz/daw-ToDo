import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {

  todo: Observable<ToDo[]>
  displayedColumns: string[] = ['name', 'date', 'priority', 'status', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private toDoService: ToDoService) { }

  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.toDoService.getToDoNotDone().subscribe(toDo => this.dataSource.data = toDo);
    console.log(this.dataSource)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public onValChange(val: string, todo:ToDo, id: string) {
    todo.status = val;
    this.toDoService.onAddToDo(todo, id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
