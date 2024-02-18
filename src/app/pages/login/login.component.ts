import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { LoginService } from './service/login.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private readonly service: LoginService) {}
  public readonly userLogin = new FormBuilder().group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public loading = false
  public submitted = false
  public loginError = false

  ngOnInit(): void {
    this.isLoggedIn()
  }

  public authenticate(): void {
    this.loginError = false
    this.submitted = true

    if (this.userLogin.invalid) {
      return
    }

    this.loading = true
    this.service.authenticate(this.userLogin.value).subscribe({
      next: data => {
        localStorage.setItem('user', JSON.stringify(data))
        this.isLoggedIn()
        this.loading = false
      },
      error: (err: HttpErrorResponse) => {
        this.loginError = true
        this.loading = false
      }
    })
  }

  private isLoggedIn(): void {
    const user = localStorage.getItem('user')

    const goToHome = (): void => {
      location.href = ''
    }

    const isLoggedIn = JSON.parse(user ?? '{}').access_token

    isLoggedIn && goToHome()
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
