import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink} from "@angular/router";
import {BackendService} from "../services/backend.service";
import {EditResponse} from "../models";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent  implements OnInit{
  editForm: FormGroup;
  id:any;

  constructor(private route:ActivatedRoute, private backend: BackendService, private fb: FormBuilder, private router:Router) {
    this.editForm = this.fb.group({
      tytul: ['', Validators.required],
      opis: ['', Validators.required],
      status: ['nowe', Validators.required],
    });
  }
  editTask(){
    if (this.editForm.valid) {
      const formData = { ...this.editForm.value, uzytkownik: this.getUserFromLocalStorage() };
      console.log(formData)

      this.backend.editId(this.id,formData).subscribe(
        (response) => {
          console.log(response);



          this.editForm.reset();
          this.router.navigateByUrl("/");
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

  ngOnInit() {
    // @ts-ignore
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  getData(){
    // @ts-ignore
    this.backend.readId(this.id).subscribe((res: EditResponse) => {
      console.log(res.task);

      // @ts-ignore
      const taskData = res.task as { tytul: string; opis: string; status: string; };

      this.editForm.patchValue({
        tytul: taskData.tytul,
        opis: taskData.opis,
        status: taskData.status
      });

      }
    );
  }

}
