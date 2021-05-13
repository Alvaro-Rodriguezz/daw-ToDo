import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-historical',
  templateUrl: './edit.component.html',
  styleUrls: ['../add/add.component.scss']
})
export class EditComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
              private toDoService: ToDoService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  toDoId = this.activatedRoute.snapshot.paramMap.get('id');
  toDo: ToDo = {
    name: "",
    description: "",
    date: "",
    priority: 0,
    id: "",
    status: ""

  }

  ngOnInit(): void {
    this.toDoService.getToDoId(this.toDoId).subscribe(toDo => {
      this.toDo = toDo;
    });

  }

  onValChange(val: string, todo:ToDo, id: string) {
    todo.status = val;
  }

  onSave(){
    this.toDoService.onAddToDo(this.toDo, this.toDoId);
    this.snackBar.open('Edited succedfully', '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
    this.router.navigateByUrl('/list');
  }
}

