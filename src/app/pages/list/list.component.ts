import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  todo: Observable<ToDo[]>
  displayedColumns: string[] = ['name', 'priority', 'status', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private toDoService: ToDoService,
    private snackBar: MatSnackBar) { }

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

  onDelete(id: string){
    this.toDoService.deleteToDo(id);
    this.snackBar.open('Deleted succedfully', '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }
}
