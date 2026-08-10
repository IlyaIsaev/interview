import type { FieldAtom } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'

import { MarkdownContent } from '@/common/components/markdown'
import { Field, FieldError, FieldLabel } from '@/common/components/ui/field'
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
    const fieldBinding = bindField(field)
    const hasValidationError = Boolean(fieldBinding.error)
    const answerMarkdown = fieldBinding.value ?? ''

    return (
      <Field
        data-invalid={hasValidationError || undefined}
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
            aria-invalid={hasValidationError || undefined}
            placeholder="Write answer in Markdown…"
            value={answerMarkdown}
            onChange={fieldBinding.onChange}
            onBlur={fieldBinding.onBlur}
            onFocus={fieldBinding.onFocus}
          />
          <div className="min-h-40 overflow-y-auto rounded-lg border border-border bg-muted/20 p-3 md:min-h-0">
            {answerMarkdown.trim() ? (
              <MarkdownContent>{answerMarkdown}</MarkdownContent>
            ) : (
              <p className="text-sm text-muted-foreground">Markdown preview</p>
            )}
          </div>
        </div>
        <FieldError>{fieldBinding.error}</FieldError>
      </Field>
    )
  },
  'MarkdownAnswerField',
)
