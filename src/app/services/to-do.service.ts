import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';
import {map, take} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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

  fileName= 'ToDoList.xlsx';
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  public onSaveExcel(info: any): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(info);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, this.fileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: this.EXCEL_TYPE});
     FileSaver.saveAs(data, fileName );
  }
}
