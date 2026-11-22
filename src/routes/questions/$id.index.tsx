import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import { highlightMarkdownCode } from "@/shared/ui/highlight-markdown";
import { QuestionMenu } from "@/widgets/question-menu";
import { Route as QuestionIdRoute } from "./$id";

export const Route = createFileRoute("/questions/$id/")({
  component: QuestionPage,
});

function QuestionPage() {
  const { question } = QuestionIdRoute.useLoaderData();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="group flex h-[70svh] w-[70vw] max-w-[1200px] [--question-actions-hover-delay:0ms]">
        <article className="question prose min-w-0 h-full max-w-none flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&>:first-child]:mt-0">
          <Markdown highlighter={highlightMarkdownCode}>{question.body}</Markdown>
        </article>
        <QuestionMenu variant="active" question={question} orientation="vertical" />
      </div>
    </main>
  );
}
