import type { FieldAtom } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'

import { Field, FieldError, FieldLabel } from '@/common/components/ui/field'

import { Input } from '@/common/components/ui/input'

type TextFieldProps = {
  field: FieldAtom<string>
  label: string
  type?: string
  autoComplete?: string
  name?: string
}

export const TextField = reatomComponent(
  ({ field, label, type = 'text', autoComplete, name }: TextFieldProps) => {
    const fieldBinding = bindField(field)
    const hasValidationError = Boolean(fieldBinding.error)

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
        <FieldError>{fieldBinding.error}</FieldError>
      </Field>
    )
  },
  'TextField',
)
