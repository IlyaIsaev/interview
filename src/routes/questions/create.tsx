import { createFileRoute } from "@tanstack/react-router";
import { CreateQuestion } from "@/features/create-question";

export const Route = createFileRoute("/questions/create")({
  ssr: true,
  head: () => ({
    meta: [
      {
        title: "Create question",
      },
    ],
  }),
  component: QuestionCreatePage,
});

function QuestionCreatePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="relative h-[70svh] w-[70vw] max-w-[1200px]">
        <CreateQuestion />
      </div>
    </main>
  );
}
