
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo';
import {Todo} from '../../todo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:String;
  todo: any = {};
  updateForm: FormGroup;

  constructor(private todoService: TodoService, private router:Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      isDone:''
    });
  }


  ngOnInit() {
    //populates the edit field
    this.route.params.subscribe(params=> {
      this.id = params.id;
      this.todoService.getTodoById(this.id).subscribe(res => {
        this.todo = res;
        this.updateForm.get('title').setValue(this.todo.title);
        this.updateForm.get('isDone').setValue(this.todo.isDone);
      })
    })
  }

  updateTodo(title, isDone){
    this.todoService.updateTodo(this.id, title, isDone).subscribe(()=>{
      this.snackBar.open('To do updated successfully', 'OK', {
        duration:3000
      });
    });
  };

};
