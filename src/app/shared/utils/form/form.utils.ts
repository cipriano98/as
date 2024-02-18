import { FormGroup } from '@angular/forms'

export class FormUtils {
  static formValid(form: FormGroup): Record<string, string> | null {
    const controls = form.controls

    const formError: Record<string, string> = {}

    Object.keys(controls).map(control => {
      const { errors } = form.get(control)!

      if (!errors) return

      const controlErrors = Object.keys(errors)

      const error = controlErrors.reduce((error, key) => {
        switch (key) {
          case 'required':
            error = 'Campo obrigatório'
            break

          case 'email':
            error = 'Digite um email válido'
            break

          case 'minlength':
            const minLength = errors[key].requiredLength
            error = `Tamanho mínimo de ${minLength} carácteres`
            break

          case 'maxlength':
            const maxLength = errors[key].requiredLength
            error = `Tamanho máximo de ${maxLength} carácteres`
            break

          default:
            error = `Erro não mapeado para: ${key}`
        }

        return error
      }, '')

      formError[control] = error
    })

    const error = Object.keys(formError)

    return error.length ? formError : null
  }
}
