
import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import type { TodoInput, TodoItem, TodosListResponse, TodoDetailResponse, TodoCreateResponse, TodoUpdateResponse, TodoDeleteResponse } from '../types/todo.types';
import type { AxiosResponse } from 'axios';

/**
 * Fetch todos from the API
 * @returns A UseQueryResult containing the todos data
 */
export const getTodos = (): UseQueryResult<TodoItem[], unknown> =>
  useQuery<TodoItem[], unknown>({
    queryKey: ['todos'],
    queryFn: async (): Promise<TodoItem[]> => {
      const { data } = await client.get<TodosListResponse>('/todos');
      return data;
    },
  });

/**
 * Fetch a single todo by ID
 * @param todoId The ID of the todo to fetch
 * @returns A UseQueryResult containing the todo data
 */
export const getTodo = (todoId: number): UseQueryResult<TodoItem, unknown> =>
  useQuery<TodoItem, unknown>({
    queryKey: ['todo', todoId],
    queryFn: async (): Promise<TodoItem> => {
      const { data } = await client.get<TodoDetailResponse>(`/todos/${todoId}`);
      return data;
    },
  });

/**
 * Create a new todo
 * @returns A UseMutationResult for the create todo mutation
 */
export const createTodo = (): UseMutationResult<AxiosResponse<TodoItem>, unknown, TodoInput, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<AxiosResponse<TodoItem>, unknown, TodoInput, unknown>({
    mutationFn: async (todo: TodoInput) => await client.post<TodoCreateResponse>('/todos/', todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/todos', { replace: true });
    },
  });
};

/**
 * Edit an existing todo
 * @param todoId The ID of the todo to edit
 * @returns A UseMutationResult for the edit todo mutation
 */
export const editTodo = (
  todoId: number
): UseMutationResult<AxiosResponse<TodoItem>, unknown, TodoInput, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<AxiosResponse<TodoItem>, unknown, TodoInput, unknown>({
    mutationFn: async (todo: TodoInput) => await client.put<TodoUpdateResponse>(`/todos/${todoId}`, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/todos', { replace: true });
    },
  });
};

/**
 * Custom hook for deleting a todo
 * @returns A UseMutationResult for the delete todo mutation
 */
export const deleteTodo = (): UseMutationResult<AxiosResponse<TodoDeleteResponse>, unknown, number, unknown> => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<TodoDeleteResponse>, unknown, number, unknown>({
    mutationFn: async (todoId: number) => await client.delete<TodoDeleteResponse>(`/todos/${todoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};