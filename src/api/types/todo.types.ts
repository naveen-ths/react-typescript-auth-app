
// Single todo item returned from API
export interface TodoItem {
  id: number;
  title: string;
  complete: boolean;
}

// Request body for creating/updating a todo
export interface TodoInput {
  title: string;
  complete: boolean;
}

// Response for GET /todos (list)
export type TodosListResponse = TodoItem[];

// Response for GET /todos/:id (single)
export type TodoDetailResponse = TodoItem;

// Response for POST /todos (create)
export type TodoCreateResponse = TodoItem;

// Response for PUT /todos/:id (update)
export type TodoUpdateResponse = TodoItem;

// Response for DELETE /todos/:id (delete)
export interface TodoDeleteResponse {
  success: boolean;
  message?: string;
}