import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private backend:BackendService) {
  }
  public error:any=[];

  public form ={
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }

  submitRegistration(){
    console.log(this.form);
    return this.backend.register(this.form).subscribe(
      data=>console.log(data),
      error =>this.handleError(error)
    );
  }
  handleError(error:any){
    this.error= error.error.errors;
  }
}
