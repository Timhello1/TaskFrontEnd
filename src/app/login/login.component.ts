import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private backend:BackendService, private token:TokenService, private router:Router, private Auth:AuthService) {}

  public form ={
    email: null,
    password: null
  }
  public error = null;
  submitLogin(){
    console.log(this.form);
    return this.backend.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data:any){
    console.log(data)
    // @ts-ignore
    localStorage.setItem('user', JSON.stringify(data.user.name));
    this.token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }
  handleError(error:any){
    this.error = error.error.error;
  }
  goToRegister(){
    this.router.navigateByUrl('/Register')
  }
}
