import type { FieldAtom } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'

import {
  Field,
  FieldError,
  FieldLabel,
} from '@/common/components/ui/field'

import { Textarea } from '@/common/components/ui/textarea'
import { cn } from '@/common/lib/utils'

type TextAreaFieldProps = {
  field: FieldAtom<string>
  label: string
  name?: string
  rows?: number
  className?: string
}

export const TextAreaField = reatomComponent(
  ({ field, label, name, rows = 6, className }: TextAreaFieldProps) => {
    const bound = bindField(field)

    const hasError = Boolean(bound.error)

    const fillsHeight = Boolean(className?.includes('flex-1'))

    return (
      <Field
        data-invalid={hasError || undefined}
        className={cn(fillsHeight && 'min-h-0', className)}
      >
        <FieldLabel className="shrink-0" htmlFor={name}>
          {label}
        </FieldLabel>
        <Textarea
          id={name}
          name={name}
          rows={fillsHeight ? undefined : rows}
          className={cn(
            fillsHeight &&
              'min-h-0 flex-1 resize-none [field-sizing:fixed]',
          )}

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
  'TextAreaField',
)
