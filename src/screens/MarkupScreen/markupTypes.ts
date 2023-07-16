type SearchConfig = {
  wholeWordOnly: boolean;
  caseSensitive: boolean;
};

type MarkupTag = 'global-highlight' | 'local-highlight' | 'shade';

export type { MarkupTag, SearchConfig };
