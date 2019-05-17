import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Todo } from '../../todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos: Todo[];
  displayedColumns: string[] = ['title', 'isDone', 'actions'];

  constructor(private todoService: TodoService, private router: Router) { };

  ngOnInit() {
    this.fetchTodos();
  };

  fetchTodos() {
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;      
      console.log('Data requested...');
      console.log(this.todos);
    });
  };

  editTodo(id) {
    this.router.navigate([`/edit/${id}`]);
  };

  updateCheck(id, title, completed){
    this.todoService.updateTodo(id, title, completed).subscribe((res)=>{
      console.log(res)
    })
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.fetchTodos();
    });
  };


};
