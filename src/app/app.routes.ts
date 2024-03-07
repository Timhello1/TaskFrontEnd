import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {BeforeLoginService} from "./services/before-login.service";
import {AfterLoginService} from "./services/after-login.service";
import {TaskEditComponent} from "./task-edit/task-edit.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate : [AfterLoginService]},
  {path: 'Login', component: LoginComponent, canActivate : [BeforeLoginService]},
  {path: 'Register', component: RegisterComponent, canActivate : [BeforeLoginService]},
  {path: 'edit/:id', component: TaskEditComponent, canActivate : [AfterLoginService]}
];
