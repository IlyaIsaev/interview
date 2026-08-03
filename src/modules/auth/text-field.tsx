import type { FieldAtom } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'

import {
  Field,
  FieldError,
  FieldLabel,
} from '@/common/components/ui/field'
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
    const bound = bindField(field)
    const hasError = Boolean(bound.error)

    return (
      <Field data-invalid={hasError || undefined}>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Input
          id={name}
          type={type}
          name={name}
          autoComplete={autoComplete}
          aria-invalid={hasError || undefined}
          value={bound.value ?? ''}
          onChange={bound.onChange}
          onBlur={bound.onBlur}
          onFocus={bound.onFocus}
        />
        <FieldError>{bound.error}</FieldError>
      </Field>
    )
  },
  'TextField',
)
