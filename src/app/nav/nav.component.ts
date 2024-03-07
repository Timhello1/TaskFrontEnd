import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {CommonModule} from "@angular/common";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  public loggedIn:boolean = false;

  constructor(private Auth:AuthService, private router:Router, private Token:TokenService) {}

  ngOnInit(): void{
    this.Auth.authStatus.subscribe(
      value => {
        this.loggedIn = value;
      }
    );
  }
  logout(event:MouseEvent){
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/Login');
  }

}
