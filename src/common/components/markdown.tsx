import Markdown from 'markdown-to-jsx'

import { cn } from '@/common/lib/utils'

type MarkdownContentProps = {
  children: string
  className?: string
}

const markdownOptions = {
  forceBlock: true,
  overrides: {
    h1: {
      props: {
        className: 'mb-2 mt-4 text-xl font-semibold tracking-tight first:mt-0',
      },
    },
    h2: {
      props: {
        className: 'mb-2 mt-3 text-lg font-semibold tracking-tight first:mt-0',
      },
    },
    h3: {
      props: {
        className: 'mb-1.5 mt-3 text-base font-semibold tracking-tight first:mt-0',
      },
    },
    p: {
      props: {
        className: 'mb-2 leading-relaxed last:mb-0',
      },
    },
    ul: {
      props: {
        className: 'mb-2 list-disc space-y-1 pl-5 last:mb-0',
      },
    },
    ol: {
      props: {
        className: 'mb-2 list-decimal space-y-1 pl-5 last:mb-0',
      },
    },
    li: {
      props: {
        className: 'leading-relaxed',
      },
    },
    a: {
      props: {
        className:
          'text-primary underline underline-offset-4 hover:text-primary/80',
        target: '_blank',
        rel: 'noreferrer',
      },
    },
    code: {
      props: {
        className:
          'rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]',
      },
    },
    pre: {
      props: {
        className:
          'mb-2 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-sm last:mb-0',
      },
    },
    blockquote: {
      props: {
        className:
          'mb-2 border-l-2 border-border pl-3 text-muted-foreground italic last:mb-0',
      },
    },
    hr: {
      props: {
        className: 'my-4 border-border',
      },
    },
    table: {
      props: {
        className: 'mb-2 w-full border-collapse text-sm last:mb-0',
      },
    },
    th: {
      props: {
        className: 'border border-border bg-muted/50 px-2 py-1 text-left font-medium',
      },
    },
    td: {
      props: {
        className: 'border border-border px-2 py-1',
      },
    },
  },
} as const

function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        'min-w-0 max-w-none break-words text-sm text-foreground',
        className,
      )}
    >
      <Markdown options={markdownOptions}>{children}</Markdown>
    </div>
  )
}

export { MarkdownContent }
