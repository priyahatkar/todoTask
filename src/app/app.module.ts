import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from './shared/components/dash-board/dash-board.component';
import { TodoFormComponent } from './shared/components/todo-form/todo-form.component';
import { TodoTableComponent } from './shared/components/todo-table/todo-table.component';
import { materialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDeleteComponent } from './shared/components/confirm-delete/confirm-delete.component';
import { TodoPipePipe } from './shared/pipe/todo-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    TodoFormComponent,
    TodoTableComponent,
    ConfirmDeleteComponent,
    TodoPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
