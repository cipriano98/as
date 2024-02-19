import { FormGroup } from '@angular/forms'

export class FormUtils {
  static formValid(form: FormGroup): Record<string, string> | null {
    const controls = form.controls

    const formError: Record<string, string> = {}

    Object.keys(controls).map(control => {
      const { errors, value } = form.get(control)!

      const isArray = Array.isArray(value)

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

            const arrayMinMassage = `Mínimo de ${minLength} itens`
            const DefaultMinMassage = `Tamanho mínimo de ${minLength} carácteres`

            error = isArray ? arrayMinMassage : DefaultMinMassage
            break

          case 'maxlength':
            const maxLength = errors[key].requiredLength
            const arrayMaxMassage = `Máximo de ${maxLength} itens`
            const DefaultMaxMassage = `Tamanho máximo de ${maxLength} carácteres`

            error = isArray ? arrayMaxMassage : DefaultMaxMassage

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
