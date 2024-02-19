import { HttpErrorResponse } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { LoginService } from './service/login.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private readonly service: LoginService) {}
  public readonly userLogin = new FormBuilder().group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public passwordType = 'password'
  public loading = false
  public submitted = false
  public loginError = false

  public authenticate(): void {
    this.loginError = false
    this.submitted = true

    if (this.userLogin.invalid) {
      return
    }

    this.loading = true
    this.service.authenticate(this.userLogin.value).subscribe({
      next: data => {
        localStorage.setItem('user', data.id)
        localStorage.setItem('access_token', data.access_token)

        location.href = ''
        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        this.loginError = true
        this.loading = false
      }
    })
  }

  public togglePassword(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
  }

  public get emailError(): string | null {
    const { email } = this.userLogin.controls

    if (this.submitted && email.errors && email.touched) {
      const errors = Object.keys(email.errors)
      const error = errors.reduce((error, key) => {
        switch (key) {
          case 'required':
            error = 'Por favor, digite seu usuário (email de cadastro)!'
            break

          case 'email':
            error = 'Digite um email válido'
            break

          default:
            error = ''
        }

        return error
      }, '')

      return error
    }

    return null
  }

  public get passwordError(): string | null {
    const { password } = this.userLogin.controls

    if (this.submitted && password.errors && password.touched) {
      const errors = Object.keys(password.errors)
      const error = errors.reduce((error, key) => {
        switch (key) {
          case 'required':
            error = 'Digite uma senha'
            break

          default:
            error = ''
        }

        return error
      }, '')

      return error
    }

    return null
  }
}
