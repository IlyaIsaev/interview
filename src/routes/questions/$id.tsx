import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getQuestion } from "@/server/questions";
import { parseQuestionPathId } from "@/shared/api/question";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

export const Route = createFileRoute("/questions/$id")({
  ssr: true,
  loader: async ({ params }) => {
    const id = parseQuestionPathId(params.id);

    if (id === null) throw notFound();

    const question = await getQuestion({ data: String(id) });

    if (!question) throw notFound();

    return { question };
  },
  head: ({ loaderData }) => {
    const result = {};

    if (loaderData?.question != null) {
      return { ...result, meta: [{ title: `Question ${loaderData.question.id}` }] };
    }

    return result;
  },
  component: QuestionLayout,
  pendingComponent: QuestionPending,
  notFoundComponent: QuestionNotFound,
});

function QuestionLayout() {
  return <Outlet />;
}

function QuestionPending() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Spinner />
    </main>
  );
}

function QuestionNotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <p>Question not found.</p>
    </main>
  );
}
