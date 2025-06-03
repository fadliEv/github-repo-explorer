export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginationResponse<T> {
  items: T[];
  total_count: number;
}
