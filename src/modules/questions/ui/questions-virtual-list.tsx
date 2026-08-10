import { wrap } from "@reatom/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type KeyboardEvent } from "react";

import { Item, ItemActions, ItemContent, ItemTitle } from "@/common/components/ui/item";

import { DeleteQuestionButton } from "../modules/delete";
import { UpdateQuestionButton } from "../modules/update";
import type { Question } from "../model/questions";

/** Matches `Item` size="sm" height + visual density for the estimate. */
const QUESTION_ROW_ESTIMATE_PX = 48;

const QUESTION_ROW_GAP_PX = 8;

type QuestionsVirtualListProps = {
  questions: Question[];
  onSelect: (questionId: string) => void;
  onItemKeyDown: (event: KeyboardEvent, questionId: string) => void;
};

export function QuestionsVirtualList({
  questions,
  onSelect,
  onItemKeyDown,
}: QuestionsVirtualListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: questions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => QUESTION_ROW_ESTIMATE_PX,
    gap: QUESTION_ROW_GAP_PX,
    overscan: 8,
  });

  return (
    <div ref={parentRef} className="min-h-0 flex-1 overflow-y-auto">
      <div
        role="list"
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = questions[virtualRow.index];

          if (!item) {
            return null;
          }

          return (
            <div
              key={item.id}
              role="listitem"
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Item
                tabIndex={0}
                variant="outline"
                size="sm"
                className="w-full cursor-pointer flex-nowrap"
                onClick={wrap(() => {
                  onSelect(item.id);
                })}
                onKeyDown={wrap((event: KeyboardEvent) => {
                  onItemKeyDown(event, item.id);
                })}
              >
                <ItemContent className="w-2/3 overflow-hidden">
                  <ItemTitle className="w-full overflow-hidden">
                    <span className="truncate">{item.question}</span>
                  </ItemTitle>
                </ItemContent>
                <ItemActions className="opacity-0 transition-opacity group-hover/item:opacity-100 group-focus-within/item:opacity-100">
                  <UpdateQuestionButton questionId={item.id} />
                  <DeleteQuestionButton questionId={item.id} />
                </ItemActions>
              </Item>
            </div>
          );
        })}
      </div>
    </div>
  );
}
