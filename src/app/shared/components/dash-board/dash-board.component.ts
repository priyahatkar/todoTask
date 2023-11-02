import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../../service/todo.service';
import { Itodo } from '../../model/totoInterface';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  public todoArray : Array<Itodo> = []
  constructor(private _dialogRef : MatDialog,
              private _todoService : TodoService,
              private _snackBar : SnackBarService) { }

  ngOnInit(): void {

    this._todoService.getAllTodos()
      .subscribe(res =>{
        this.todoArray = res
      })

      this._todoService.todoObsInfo$
        .subscribe(res =>{
          this.todoArray.push(res)
          this._snackBar.openSnackBar( `Todo Post is successfully Added ${res.title}`, 'close')
        })
      
      this._todoService.todoUpdateInfo$
        .subscribe(res =>{
          this.todoArray.forEach(todo =>{
            if(todo.id === res.id){
              todo.assignedDate = res.assignedDate;
              todo.dueDate = res.dueDate;
              todo.title = res.title;
              todo.selectFile = res.selectFile;
              todo.status = res.status;
              this._snackBar.openSnackBar(`Todo Post Updated is successfully ${todo.title}`, 'close');
            }
          })
        })
  }
  
  onTodoFormOpen(){
    const dialogConf = new MatDialogConfig()
    dialogConf.disableClose = true;
    const dialog = this._dialogRef.open(TodoFormComponent, dialogConf);
  }

  onEditTodoPost(todo : Itodo){
    const dialogConf = new MatDialogConfig()
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.data = todo
    const dialog = this._dialogRef.open(TodoFormComponent, dialogConf);
  }

  onDeleteTodoPost(id : any){
    let getIndex = this.todoArray.findIndex(todo => todo.id === id);

    this.todoArray.splice(getIndex, 1)
    this._snackBar.openSnackBar(`Todo post successfully Remove `, 'close')
  }
}
