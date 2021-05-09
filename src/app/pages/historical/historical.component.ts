import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {


  todo: Observable<ToDo[]>
  displayedColumns: string[] = ['name', 'priority', 'status', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private toDoService: ToDoService,
    private snackBar: MatSnackBar) { }

  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.toDoService.getToDoDone().subscribe(toDo => this.dataSource.data = toDo);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onDelete(id: string){
    this.toDoService.deleteToDo(id);
    this.snackBar.open('Deleted succedfully', '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }
}
