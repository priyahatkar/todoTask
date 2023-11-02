import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(private _dialogRef : MatDialogRef<ConfirmDeleteComponent>) { }

  ngOnInit(): void {
  }

  onConfirmDelete(){
    this._dialogRef.close(true)
  }
  onCancel(){
    this._dialogRef.close(true)
  }
}
