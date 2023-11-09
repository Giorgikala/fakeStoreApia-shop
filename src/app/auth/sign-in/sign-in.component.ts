import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberUser: false,
    });
  }

  ngOnInit() {}


  onSignIn() {
    const { username, password, rememberUser } = this.form.value;
    if (username !== '' && password !== '') {
      this.auth
        .authUser({ username, password, rememberUser })
        .subscribe((result) => {
            this.route.navigate(['/main']);
          
        });
    } else {
      alert('Please fill values');
    }
  }
  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
