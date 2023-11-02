import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Itodo } from '../model/totoInterface';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoUrl : string = `${environment.baseUrl}/todo.json`;
  private todoObsPost$ : Subject<Itodo> = new Subject<Itodo>();
  public todoObsInfo$ = this.todoObsPost$.asObservable()
  private todoUpdatePost$ : Subject<Itodo> = new Subject<Itodo>();
  public todoUpdateInfo$ = this.todoUpdatePost$.asObservable()
  constructor(private _http : HttpClient,
                private _snackBar : SnackBarService) { }

  getAllTodos(): Observable<Itodo[]>{
    return this._http.get<Itodo[]>(this.todoUrl)
      .pipe(
        map((res)=>{
          let todoArray : Array<Itodo>= [];
            for (const key in res) {
              todoArray.push({...res[key], id : key})
            }
            return todoArray
        })
      )
  }

  toCreateTodoInfo(todo : Itodo){
    return this._http.post(this.todoUrl, todo)
  }
  
  sendTodoObs(todo : Itodo){
    this.todoObsPost$.next(todo)
  }

  toUpdateTodo(todo : Itodo): Observable<null>{
    let updateUrl = `${environment.baseUrl}/todo/${todo.id}.json`;
    return this._http.patch<null>(updateUrl, todo)
  }

  sendUpdateTodo(todo: Itodo){
    this.todoUpdatePost$.next(todo)
  }

  toDeleteTodo(id : Itodo): Observable<Itodo>{
    let deleteUrl = `${environment.baseUrl}/todo/${id}.json`;
    return this._http.delete<Itodo>(deleteUrl)
  }
}
