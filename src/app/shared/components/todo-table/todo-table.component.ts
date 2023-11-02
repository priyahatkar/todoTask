import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itodo } from '../../model/totoInterface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {
  @Input() todoPost : Array<Itodo> = [];
  public searchFilterTodo !: string
  @Output() emitEditTodo : EventEmitter<Itodo> = new EventEmitter<Itodo>();
  @Output() emitDeleteTodo : EventEmitter<Itodo> = new EventEmitter<Itodo>();
  constructor(private _dialogRef : MatDialog,
              private _todoService : TodoService) { }

  ngOnInit(): void {
  }

  onEditTodo(todo : Itodo){
    this.emitEditTodo.emit(todo);
  }
  onDeleteTodo(todoId : any){
    let dialogConf = this._dialogRef.open(ConfirmDeleteComponent)

    dialogConf.afterClosed()
      .subscribe(getConfirmation =>{
        if(getConfirmation){
          this._todoService.toDeleteTodo(todoId)
            .subscribe(res =>{
              this.emitDeleteTodo.emit(todoId);
            })
        }
      })
  }
}
