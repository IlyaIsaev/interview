import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useEvent } from "@reactuses/core";
import { Questions } from "@/entities/question";
import { QuestionSearch } from "@/features/question-search";
import { getQuestions } from "@/server/questions";
import { readQuestionQuery } from "@/shared/api/list-questions";
import { parseQuestionPathId } from "@/shared/api/question";
import { QuestionMenu } from "@/widgets/question-menu";

type QuestionsSearch = {
  readonly id?: number | string;
  readonly q?: string;
};

type QuestionsSearchInput = Record<string, unknown>;

const readQuestionSearchId = (id: unknown): number | string => {
  if (typeof id === "number" && Number.isSafeInteger(id)) return id;

  if (typeof id === "string") return id;

  return "";
};

const validateQuestionSearch = (search: QuestionsSearchInput): QuestionsSearch => {
  const q = readQuestionQuery(search);
  const hasId = Object.hasOwn(search, "id");

  return {
    ...(hasId ? { id: readQuestionSearchId(search.id) } : {}),
    ...(q !== undefined ? { q } : {}),
  };
};

const parseQuestionSearchId = (id: number | string): number | null => {
  if (typeof id === "number" && Number.isSafeInteger(id) && id >= 1) return id;

  if (typeof id === "number") return null;

  return parseQuestionPathId(id);
};

export const Route = createFileRoute("/questions/")({
  ssr: true,
  validateSearch: validateQuestionSearch,
  beforeLoad: ({ search }) => {
    if (search.id === undefined) return;

    const id = parseQuestionSearchId(search.id);

    if (id === null) throw notFound();

    throw redirect({
      to: "/questions/$id",
      params: { id: String(id) },
    });
  },
  loaderDeps: ({ search }) => ({
    query: search.q ?? "",
  }),
  loader: async ({ deps }) => {
    const questions = await getQuestions({ data: { query: deps.query } });

    return { questions };
  },
  head: () => ({
    meta: [{ title: "Questions" }],
  }),
  component: QuestionsPage,
  notFoundComponent: QuestionNotFound,
});

function QuestionsPage() {
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
          <p className="text-muted-foreground">{q ? "No matching questions." : "No questions."}</p>
        }
        slots={{
          open: (question, body) => (
            <Link
              to="/questions/$id"
              params={{ id: String(question.id) }}
              className="block cursor-pointer text-inherit no-underline hover:no-underline"
            >
              {body}
            </Link>
          ),
          actions: (question) => (
            <QuestionMenu variant="active" question={question} after="refreshQuestions" />
          ),
        }}
      />
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
