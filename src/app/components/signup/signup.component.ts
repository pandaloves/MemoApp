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
import { IUser } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  userId!: number;

  save() {
    console.log(this.signupForm.value);
    const user: IUser = {
      username: this.signupForm.value.username!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
    };
    this.httpService.createUser(user).subscribe(() => {
      console.log('success');
      this.toaster.success('Signup sucessfully.');
      this.router.navigateByUrl('/login');
    });
  }
}
