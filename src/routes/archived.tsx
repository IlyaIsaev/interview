import { createFileRoute } from "@tanstack/react-router";
import { useEvent } from "@reactuses/core";
import { Questions } from "@/entities/question";
import { QuestionSearch } from "@/features/question-search";
import { getArchivedQuestions } from "@/server/questions";
import { readQuestionQuery } from "@/shared/api/list-questions";
import { QuestionMenu } from "@/widgets/question-menu";

type ArchivedSearch = {
  readonly q?: string;
};

type ArchivedSearchInput = Record<string, unknown>;

const validateArchivedSearch = (search: ArchivedSearchInput): ArchivedSearch => {
  const q = readQuestionQuery(search);

  return q !== undefined ? { q } : {};
};

export const Route = createFileRoute("/archived")({
  ssr: true,
  validateSearch: validateArchivedSearch,
  loaderDeps: ({ search }) => ({
    query: search.q ?? "",
  }),
  loader: async ({ deps }) => {
    const questions = await getArchivedQuestions({ data: { query: deps.query } });

    return { questions };
  },
  head: () => ({
    meta: [{ title: "Archived questions" }],
  }),
  component: ArchivedPage,
});

function ArchivedPage() {
  const { questions } = Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();

  const changeQuery = useEvent((query: string) => {
    void navigate({
      search: (prev) => ({
        ...prev,
        q: query.length > 0 ? query : undefined,
      }),
      replace: true,
    });
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6">
      <QuestionSearch query={q ?? ""} onQueryChange={changeQuery} />
      <Questions
        questions={questions}
        empty={
          <p className="text-muted-foreground">
            {q ? "No matching questions." : "No archived questions."}
          </p>
        }
        slots={{
          actions: (question) => (
            <QuestionMenu variant="archived" question={question} after="refreshQuestions" />
          ),
        }}
      />
    </main>
  );
}
