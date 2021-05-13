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

      return this.getData();
  }

  getToDoDone(): Observable<ToDo[]>{
    this.toDoCollection = this.angularFirestore.collection<ToDo>('toDo', ref => {
        return ref.where('status', '==', 'Done');
    });

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

  getTodo(){
      return this.todo;
  }


  deleteToDo(id: string): Promise<void>{
      return this.toDoCollection.doc(id).delete();
  }

  getToDoId(id: string): Observable<ToDo> {
    return this.toDoCollection.doc<ToDo>(id).valueChanges().pipe(
        take(1),
        map(toDo => {
          toDo.id = id;
            return toDo;
        })
    );
  }

  onAddToDo(toDo: ToDo, toDoId: string): Promise<void>{
    return new Promise(async (resolve,reject) => {
      try{
        const id = toDoId || this.angularFirestore.createId();
        toDo.id = id;
        const data = {id, ...toDo};
        const results = await this.toDoCollection.doc(id).set(data);
        resolve(results);
      } catch (e){
        reject(e.message);
      }
    });
  }
}
