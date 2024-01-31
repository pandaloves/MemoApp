import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup', 
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster=inject(ToastrService);
  signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', []],
    age: [0, [Validators.required]],
    salary: [0, [Validators.required]],
    password: ['', [Validators.required]]
  });
  employeeId!: number;

  save() {
    console.log(this.signupForm.value);
    const employee: IEmployee = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      phone: this.signupForm.value.phone!,
      age: this.signupForm.value.age!,  
      salary: this.signupForm.value.salary!,
      password: this.signupForm.value.password!,
    };
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log('success');
        this.toaster.success("Signup sucessfully.");
        this.router.navigateByUrl('/login');
      });
    }
  }
