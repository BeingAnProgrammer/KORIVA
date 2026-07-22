/** A single canned question/answer pair for the landing page's RAG chat demo. */
export interface ChatExchange {
  query: string;
  /** HTML string — may contain `<strong>` for emphasis; rendered via [innerHTML]. */
  answer: string;
  citations: readonly string[];
}
