import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-historical',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
              private toDoService: ToDoService) { }

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
    console.log("TEST");
    console.log(this.toDoId);
    this.toDoService.getToDoId(this.toDoId).subscribe(toDo => {
      this.toDo = toDo;
    });
  }

}
