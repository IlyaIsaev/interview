import { Markdown } from "@tanstack/markdown/react";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { highlightMarkdownCode } from "@/shared/ui/highlight-markdown";
import { Virtualizer } from "@/shared/ui/virtualizer";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";
import { Separator } from "@/shared/ui-kit/components/ui/separator";

type Question = {
  readonly id: number;
  readonly body: string;
};

type QuestionsSlots = {
  readonly actions: (question: Question) => ReactNode;
  readonly open?: (question: Question, body: ReactNode) => ReactNode;
};

type QuestionsProps = {
  readonly questions: readonly Question[];
  readonly empty: ReactNode;
  readonly slots: QuestionsSlots;
};

type QuestionRowProps = {
  readonly question: Question;
  readonly index: number;
  readonly slots: QuestionsSlots;
};

const questionKey = (question: Question): number => question.id;

const subscribeNever = (): (() => void) => () => {};

const useIsClient = (): boolean =>
  useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

const useQuestionsLayoutReady = (questions: readonly Question[]): boolean => {
  const isClient = useIsClient();

  return questions.length === 0 || isClient;
};

function QuestionRow({ question, index, slots }: QuestionRowProps): ReactNode {
  const body = (
    <div className="question prose max-w-none [&>:first-child]:mt-0">
      <Markdown highlighter={highlightMarkdownCode}>{question.body}</Markdown>
    </div>
  );

  return (
    <>
      {index > 0 ? <Separator /> : null}
      <article className="group py-4 [--question-actions-hover-delay:0ms]">
        <div className="relative">
          {slots.open ? slots.open(question, body) : body}
          {slots.actions(question)}
        </div>
      </article>
    </>
  );
}

export function Questions({ questions, empty, slots }: QuestionsProps): ReactNode {
  const isReady = useQuestionsLayoutReady(questions);

  return (
    <div className="relative flex h-[70svh] w-[70vw] max-w-[1200px] flex-col" aria-busy={!isReady}>
      <Virtualizer rows={questions} getRowKey={questionKey} empty={empty}>
        {(question, index) => <QuestionRow question={question} index={index} slots={slots} />}
      </Virtualizer>
      {isReady ? null : (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <Spinner className="size-8" />
        </div>
      )}
    </div>
  );
}
