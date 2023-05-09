import { Doc } from "./Doc";

export class PagedList {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: Doc[];
}
