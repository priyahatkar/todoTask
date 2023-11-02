import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../service/todo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Itodo } from '../../model/totoInterface';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  public todoForm !: FormGroup;
  minDate : Date = new Date();
  date!: Date;
  imageSrc !: any
  public status = ["Active", "Close", "Archive"]
  public canEdit : boolean = false;
  public editId !: Itodo
  public isDisabled :boolean=true

  
  constructor(@Inject(MAT_DIALOG_DATA)getTodo : Itodo,
              private _todoService : TodoService,
              private _dialogRef : MatDialogRef<TodoFormComponent>,
              private _snackBar : SnackBarService) {
    this.createTodoForm()
    this.editId = getTodo
    if(getTodo){
      this.todoForm.patchValue(getTodo)
      this.canEdit = true;
      this._todoService.toUpdateTodo(getTodo)
    }
  }

  ngOnInit(): void {
    this.date = new Date();
    this.date.setDate( this.date.getDate() + 10);
  }

  createTodoForm(){
    this.todoForm = new FormGroup({
      title : new FormControl(null,[Validators.required]),
      assignedDate : new FormControl(null,[Validators.required]),
      dueDate : new FormControl(null,[Validators.required]),
      status : new FormControl(null,[Validators.required]),
      selectFile : new FormControl(null,[Validators.required]),
    })
  }

  get f(){
    return this.todoForm.controls
  }

  onTodoForm(){
    if(this.todoForm.valid){
      let todoInfo = this.todoForm.value;
      this._todoService.toCreateTodoInfo(todoInfo)
        .subscribe(res =>{
          this._todoService.sendTodoObs(todoInfo)
          this._dialogRef.close()
        })
        this.todoForm.reset()
    }
  }

  onCancelForm(){
    this._dialogRef.close()
  }

  onUpdateTod(){
    let updateTodo : Itodo = {...this.todoForm.value, id : this.editId.id}
    this._todoService.toUpdateTodo(updateTodo)
      .subscribe(res =>{
        this._todoService.sendUpdateTodo(updateTodo)
        this._dialogRef.close()
      })
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= 200 * 1024 && this.todoForm.valid) {
        // File is within the size limit, you can proceed with the upload.
        this.isDisabled=false
        console.log('File size is within the limit');
      } else {
        this.isDisabled=true
        console.error('File size exceeds the limit (200KB)');
        this._snackBar.openSnackBar(`File size exceeds the limit (200KB)`, 'close')
      }
    }

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }
}
