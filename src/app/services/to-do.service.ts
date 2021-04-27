import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';
import {map} from 'rxjs/operators'
import { rejects } from 'node:assert';
import { resolve } from 'node:path';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  todo: Observable<ToDo[]>;

  private toDoCollection: AngularFirestoreCollection<ToDo>;

  constructor(private angularFirestore: AngularFirestore) {
    this.toDoCollection = angularFirestore.collection<ToDo>('toDo');
    this.getToDo();
  }

  onDeleteToDo(id: string): Promise<void>{
    return new Promise(async (resolve,reject) => {
      try{
        const result = await this.toDoCollection.doc(id).delete();
        resolve(result)
      } catch(e){
        reject(e.message);
      }
    });
  }

  onAddToDo(toDo: ToDo): Promise<void>{
    return new Promise(async (resolve,reject) => {
      try{
        const id = this.angularFirestore.createId();
        const data = {id, ...toDo};
        const results = await this.toDoCollection.doc(id).set(data);
        resolve(results);
      } catch (e){
        reject(e.message);
      }
    })
  }

  private getToDo(): void{
    this.todo = this.toDoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as ToDo))
    )
  }
}
