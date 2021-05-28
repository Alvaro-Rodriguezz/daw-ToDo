# ToDoList
This project allows the user to control a list of tasks. The user can create, read, edit and delete tasks. The tasks created have the following attributes:
* **Name:** Name of the task
* **Description:** Description of the task
* **Date:** Date of the creation of the task
* **Priority:** Priority that the user gives to that task
* **Status:** Status of the task. The status can be: pending, in progress, or done. When a task is created the status is automatically set to pending.

While a task is pending or in progress it can be found on the main page. When it's done it will move to a different page called historical.

To check the details of a task, click in the row of that task inside the table.

The tasks that are not done can be downloaded as Excel Sheets.
<br>
<br>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Production server

The project currently hosted in firebase. It can be checked following this [link](https://angular-todo-359c9.web.app/list).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
