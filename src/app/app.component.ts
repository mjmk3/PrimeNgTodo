import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {ButtonModule} from "primeng/button";
import {CheckboxChangeEvent, CheckboxModule} from "primeng/checkbox";
import {ChipsModule} from "primeng/chips";
import {Todo} from "./todo";
import {AppService} from "./app.Service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardModule, TableModule, PaginatorModule, ButtonModule, CheckboxModule, ChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('todoTask') todoTask: any;

  task = '';
  todos: Todo[] = [];

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.appService.getTodoList().subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.appService.updateTodo({ ...todo, completed: e.checked }).subscribe(
      response => console.log(response)
    )
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    this.appService.deleteTodo(id).subscribe(
      response => this.getList()
    )
  }

  addTodo() {
    this.appService.addTodo({ task: this.task, completed: false }).subscribe(
      response => {
        this.todoTask.reset();
        this.getList();
      }
    )
  }
}
