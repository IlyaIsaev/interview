import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRandomQuestion, isNoQuestionsFoundError } from "@/server/questions";
import type { Question } from "@/server/questions";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

const loadRandomQuestion = async (): Promise<Question | null> => {
  try {
    return await getRandomQuestion();
  } catch (error) {
    if (isNoQuestionsFoundError(error)) return null;

    throw error;
  }
};

export const Route = createFileRoute("/")({
  ssr: true,
  loader: async () => {
    const question = await loadRandomQuestion();

    if (question === null) return { empty: true as const };

    throw redirect({
      to: "/questions/$id",
      params: { id: String(question.id) },
      replace: true,
    });
  },
  component: IndexPage,
  pendingComponent: IndexPending,
});

function IndexPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <p>No questions left.</p>
    </main>
  );
}

function IndexPending() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Spinner />
    </main>
  );
}
