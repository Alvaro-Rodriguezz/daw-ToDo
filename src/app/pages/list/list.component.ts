import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  todo: Observable<ToDo[]>
  displayedColumns: string[] = ['name', 'priority', 'status', 'edit', 'delete'];
  @ViewChild(MatSort) sort: MatSort;

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: ['name', 'priority', 'status'],
    showTitle: false,
    title: 'ToDo List',
    useBom: false,
    removeNewLines: true,
    keys: ['approved','age','name' ]
  };

  constructor(private toDoService: ToDoService,
    private snackBar: MatSnackBar) { }

  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.toDoService.getToDoNotDone().subscribe(toDo => this.dataSource.data = toDo);

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


  onSaveExcel(){
    this.toDoService.onSaveExcel(this.dataSource.data)
  }
}
