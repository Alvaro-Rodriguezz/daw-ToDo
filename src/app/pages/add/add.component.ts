import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor() { }

  statusControl = new FormControl('', Validators.required);
  status: string[] = ["En proceso","Pendiente"];

  ngOnInit(): void {
  }

}
