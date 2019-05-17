import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../todo';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private todoService: TodoService, private fb:FormBuilder, private router:Router) { 
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      isDone:''
    });
  };

  addTodo(title, isDone){
    this.todoService.addTodo(title).subscribe(()=>{
      this.router.navigate(['/list']);
    });
  };  
    
  ngOnInit() {
  };

};
