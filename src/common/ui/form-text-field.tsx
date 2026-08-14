import type { FieldAtom } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'

import { Field, FieldError, FieldLabel } from '@/common/ui/field'
import { Input } from '@/common/ui/input'

type FormTextFieldProps = {
  field: FieldAtom<string>
  label: string
  type?: string
  autoComplete?: string
  name?: string
}

export const FormTextField = reatomComponent(
  ({ field, label, type = 'text', autoComplete, name }: FormTextFieldProps) => {
    const fieldBinding = bindField(field)
    const fieldError = field.validation().triggered
      ? fieldBinding.error
      : undefined
    const hasValidationError = Boolean(fieldError)

    return (
      <Field data-invalid={hasValidationError || undefined}>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Input
          id={name}
          type={type}
          name={name}
          autoComplete={autoComplete}
          aria-invalid={hasValidationError || undefined}
          value={fieldBinding.value ?? ''}
          onChange={fieldBinding.onChange}
          onBlur={fieldBinding.onBlur}
          onFocus={fieldBinding.onFocus}
        />
        <FieldError>{fieldError}</FieldError>
      </Field>
    )
  },
  'FormTextField',
)
