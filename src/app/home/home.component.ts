import {Component, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {CommonModule} from "@angular/common";
import {TaskResponse} from "../models";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tasksArray:any;
  taskForm: FormGroup;

  constructor(private backend:BackendService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      tytul: ['', Validators.required],
      opis: ['', Validators.required],
      status: ['nowe', Validators.required],
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    // @ts-ignore
    this.backend.read(this.getUserFromLocalStorage()).subscribe((res: TaskResponse) => {
      this.tasksArray = res.tasks;
    });
  }

  submitTask() {
    if (this.taskForm.valid) {
      const formData = { ...this.taskForm.value, uzytkownik: this.getUserFromLocalStorage() };
      console.log(formData)

      this.backend.addTask(formData).subscribe(
        (response) => {
          console.log(response);



          this.taskForm.reset();
          this.getTasks()
        },
        (error) => {
          console.error(error);

        }
      );
    }
  }

  private getUserFromLocalStorage(): string | null {
    const userString = localStorage.getItem('user');

    if (userString) {

      const modifiedUserString = userString.slice(1, -1);

      return modifiedUserString;
    }

    return null;
  }
  // @ts-ignore
  deleteData(id){
    this.backend.deleteTask(id).subscribe(res  => {
      this.getTasks();
    });
  }
}
