import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterStep2Component } from '../register-step2/register-step2.component';
import { UsersService } from '../users/users.services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    MatIcon,
    FormsModule,
    RegisterStep2Component,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('togglePassword') togglePassword!: ElementRef;

  resetForm: FormGroup;
  showContinueButton: boolean = false;

  constructor(public userService: UsersService, private fb: FormBuilder) {
    this.resetForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(200),
          ],
        ],
        confirmPassword: ['', Validators.required],
      }
      //{ validator: this.passwordMatchValidator } as AbstractControlOptions
    );
  }

  /*ngOnInit() {
    this.getUserList();
  }*/

  async getUserList(username: string) {
    const result = await firstValueFrom(
      this.userService.getListUsers(username)
    );
    console.log(result);
    return result;
  }

  async onUsernameInput(): Promise<void> {
    const username = this.resetForm.get('username')?.value;
    const db_user = await this.getUserList(username);
    const result = db_user.valueOf();

    if (result.hasOwnProperty(length)) {
      console.log('exists');
      this.condition2 = true;
    } else {
      this.condition2 = false;
    }
  }

  async getEmailList(email: string) {
    const result = await firstValueFrom(this.userService.getEmailList(email));
    console.log(result);
    return result;
  }

  async onEmailInput(): Promise<void> {
    const email = this.resetForm.get('email')?.value;
    const db_email = await this.getEmailList(email);
    const result = db_email.valueOf();

    if (result.hasOwnProperty(length)) {
      console.log('exists');
      this.condition3 = true;
    } else {
      this.condition3 = false;
    }
  }

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Password reset form submitted', this.resetForm.value);
      // Implement your password reset logic here
    } else {
      console.log('Form is invalid');
    }
  }

  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  setValue() {
    console.log(this.username, this.email, this.password);
  }

  condition1: boolean = true;
  visible: boolean = false;
  showhideUtility() {
    this.visible = this.visible ? false : true;
    this.condition1 = this.visible ? false : true;
  }

  condition2: boolean = false;

  condition3: boolean = false;
}
