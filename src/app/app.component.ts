import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toDo-List';
  light_dark = "Light Mode";

  color = 'blue';
  checked = false;


  changed(){
    this.checked = !this.checked;
    if(this.checked){
      this.light_dark = "Dark Mode";
    } else {
      this.light_dark = "Light Mode";
    }
  }
}
