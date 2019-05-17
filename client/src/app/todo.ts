import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { };

  getTodos() {
    return this.http.get(`/todos`);
  };

  getTodoById(id) {
    return this.http.get(`/todo/${id}`);
  };

  addTodo(title) {
    const todo = {
      title: title
    };
    return this.http.post(`/todo/add`, todo);
  };
  
  updateTodo(id, title, isDone) {
    const todo = {
      title: title,
      isDone: isDone
    };
    return this.http.post(`/todo/update/${id}`, todo);
  };


  deleteTodo(id){
    return this.http.get(`/todo/delete/${id}`);
  };

};
