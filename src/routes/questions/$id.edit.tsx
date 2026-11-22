import { createFileRoute } from "@tanstack/react-router";
import { UpdateQuestion } from "@/features/update-question";
import { Route as QuestionIdRoute } from "./$id";

export const Route = createFileRoute("/questions/$id/edit")({
  ssr: true,
  head: ({ params }) => ({
    meta: [{ title: `Edit question ${params.id}` }],
  }),
  component: QuestionEditPage,
});

function QuestionEditPage() {
  const { question } = QuestionIdRoute.useLoaderData();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="relative h-[70svh] w-[70vw] max-w-[1200px]">
        <UpdateQuestion id={question.id} body={question.body} />
      </div>
    </main>
  );
}
