import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';
import {map, take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  todo: Observable<ToDo[]>;

  private toDoCollection: AngularFirestoreCollection<ToDo>;

  constructor(private angularFirestore: AngularFirestore) {
    this.toDoCollection = this.angularFirestore.collection<ToDo>('toDo');
    this.todo = this.getData();
}

getToDoNotDone(): Observable<ToDo[]>{
    this.toDoCollection = this.angularFirestore.collection<ToDo>('toDo', ref => {
        return ref.where('status', '!=', 'Done');
    });
    console.log(this.toDoCollection);
    
    return this.getData();
}

getToDoDone(): Observable<ToDo[]>{
  this.toDoCollection = this.angularFirestore.collection<ToDo>('toDo', ref => {
      return ref.where('status', '!=', 'Done');
  });
  console.log(this.toDoCollection);
  
  return this.getData();
}

getData(){
    return this.toDoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
      });
    })
  );
}

getEquipoId(id: string): Observable<ToDo> {
    return this.toDoCollection.doc<ToDo>(id).valueChanges().pipe(
        take(1),
        map(todo => {
          todo.id = id;
            return todo;
        })
    );
  }
  getTodo(){
      return this.todo;
  }


  addEquipo(todo: ToDo): any{
      return this.toDoCollection.add(todo);
  }

  deleteEquipo(id: string): Promise<void>{
      //eliminar jugadores
      return this.toDoCollection.doc(id).delete();
  }
}
