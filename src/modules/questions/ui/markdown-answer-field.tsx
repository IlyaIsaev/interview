import type { FieldAtom } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'

import { MarkdownContent } from '@/common/components/markdown'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/common/components/ui/field'
import { Textarea } from '@/common/components/ui/textarea'
import { cn } from '@/common/lib/utils'

type MarkdownAnswerFieldProps = {
  field: FieldAtom<string>
  label: string
  name?: string
  className?: string
}

export const MarkdownAnswerField = reatomComponent(
  ({ field, label, name, className }: MarkdownAnswerFieldProps) => {
    const bound = bindField(field)
    const hasError = Boolean(bound.error)
    const value = bound.value ?? ''

    return (
      <Field
        data-invalid={hasError || undefined}
        className={cn('min-h-0', className)}
      >
        <FieldLabel className="shrink-0" htmlFor={name}>
          {label}
        </FieldLabel>
        <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-2">
          <Textarea
            id={name}
            name={name}
            className="min-h-40 flex-1 resize-none md:min-h-0 [field-sizing:fixed]"
            aria-invalid={hasError || undefined}
            placeholder="Write answer in Markdown…"
            value={value}
            onChange={bound.onChange}
            onBlur={bound.onBlur}
            onFocus={bound.onFocus}
          />
          <div className="min-h-40 overflow-y-auto rounded-lg border border-border bg-muted/20 p-3 md:min-h-0">
            {value.trim() ? (
              <MarkdownContent>{value}</MarkdownContent>
            ) : (
              <p className="text-sm text-muted-foreground">
                Markdown preview
              </p>
            )}
          </div>
        </div>
        <FieldError>{bound.error}</FieldError>
      </Field>
    )
  },
  'MarkdownAnswerField',
)
