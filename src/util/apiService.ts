import { Todo } from "@/type/todo.type";

type FetchDataTodType = (params?: Record<string, string | number | any>) => string;
const apiPath = '/api/todo'
export const fetchDataTodo:FetchDataTodType = (params = {}) => {
  const newParams = `${
    Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : ''
  }`;

  return `${apiPath}${newParams}`;
};

export const deleteTodos = (id: string) => {
  return fetch(`${apiPath}/${id}`, {
    method: 'DELETE',
  });
}; 

export const addNewTodo = (body: Todo ) => {
  return fetch(apiPath, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
export const updateTodo = (id: string, body: Todo | unknown) => {
  return fetch(`${apiPath}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

