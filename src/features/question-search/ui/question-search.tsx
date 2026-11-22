import { useDebounce } from "@reactuses/core";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui-kit/components/ui/input-group";

const SEARCH_DEBOUNCE_MS = 300;

type QuestionSearchProps = {
  readonly query: string;
  readonly onQueryChange: (query: string) => void;
};

export function QuestionSearch({ query, onQueryChange }: QuestionSearchProps): ReactNode {
  const [queryDraft, setQueryDraft] = useState(query);
  const debouncedQuery = useDebounce(queryDraft, SEARCH_DEBOUNCE_MS);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery === query) return;

    onQueryChange(trimmedQuery);
  }, [debouncedQuery, onQueryChange, query]);

  useEffect(() => {
    if (document.activeElement === inputRef.current) return;

    setQueryDraft(query);
  }, [query]);

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[70vw] max-w-[1200px] -translate-x-1/2">
      <InputGroup>
        <InputGroupInput
          ref={inputRef}
          type="search"
          value={queryDraft}
          placeholder="Search"
          aria-label="Search questions"
          autoComplete="off"
          onChange={(event) => {
            setQueryDraft(event.target.value);
          }}
        />
        <InputGroupAddon align="inline-start">
          <Search aria-hidden />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
