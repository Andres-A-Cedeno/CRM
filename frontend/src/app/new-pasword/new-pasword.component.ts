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

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIcon],
  selector: 'app-new-pasword',
  templateUrl: './new-pasword.component.html',
  styleUrl: './new-pasword.component.css',
})
export class NewPaswordComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('togglePassword') togglePassword!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  @ViewChild('toggleConfirmPassword') toggleConfirmPassword!: ElementRef;
  @ViewChild('strengthMeter') strengthMeter!: ElementRef;
  @ViewChild('strengthText') strengthText!: ElementRef;

  resetForm: FormGroup;
  showStrengthIndicator: boolean = false;
  private criteriaItems!: NodeListOf<Element>;

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator } as AbstractControlOptions
    );
  }

  ngOnInit() {
    //this.criteriaItems = document.querySelectorAll('.jobluu-criteria-item');
  }

  ngAfterViewInit() {
    this.updateUI(0, '');
  }

  togglePasswordVisibility(): void {
    this.toggleVisibility(this.passwordInput, this.togglePassword);
  }

  toggleConfirmPasswordVisibility(): void {
    this.toggleVisibility(
      this.confirmPasswordInput,
      this.toggleConfirmPassword
    );
  }

  private toggleVisibility(inputRef: ElementRef, iconRef: ElementRef): void {
    if (inputRef && iconRef) {
      const input = inputRef.nativeElement;
      const icon = iconRef.nativeElement;

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    }
  }

  onPasswordInput(): void {
    const password = this.resetForm.get('password')?.value;
    if (password && password.length > 0) {
      this.showStrengthIndicator = true;
      const strength = this.checkPasswordStrength(password);
      this.updateUI(strength, password);
    } else {
      this.showStrengthIndicator = false;
    }
  }

  private checkPasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  }

  private updateUI(strength: number, password: string): void {
    if (this.strengthMeter && this.strengthText) {
      const meter = this.strengthMeter.nativeElement;
      const text = this.strengthText.nativeElement;

      meter.style.width = `${strength * 20}%`;
      meter.setAttribute('data-strength', strength.toString());

      const strengthTexts = [
        'Muy debil',
        'Debil',
        'Mala',
        'Buena',
        'Excellente',
      ];
      text.textContent = strengthTexts[strength - 1] || 'Password Strength';

      this.criteriaItems.forEach((item) => {
        if (item instanceof HTMLElement) {
          const criterion = item.getAttribute('data-criterion');
          let isMet = false;

          switch (criterion) {
            case 'length':
              isMet = password.length >= 8 && password.length <= 15;
              break;
            case 'uppercase':
              isMet = /[A-Z]/.test(password);
              break;
            case 'lowercase':
              isMet = /[a-z]/.test(password);
              break;
            case 'number':
              isMet = /[0-9]/.test(password);
              break;
            case 'special':
              isMet = /[^A-Za-z0-9]/.test(password);
              break;
          }

          if (isMet) {
            item.classList.add('met');
          } else {
            item.classList.remove('met');
          }
        }
      });
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Password reset form submitted', this.resetForm.value);
      // Implement your password reset logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
