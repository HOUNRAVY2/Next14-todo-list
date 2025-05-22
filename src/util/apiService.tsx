import { getStrapiDomain } from "./dev";

type FetchDataByGetType = (url: string, params?: Record<string, string | number | any>) => string;
type FetchImageType = (url: string) => string;
type RequestInitType = (body: Record<string, any>, method?: 'POST' | 'GET' | 'PUT' | 'DELETE') => RequestInit;
type FetcherType = (...args: Parameters<typeof fetch>) => Promise<any>;
const apiPath = '/api'
export const fetchDataByGet:FetchDataByGetType = (url, params = {}) => {
  const newParams = `${
    Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : ''
  }`;

  return `${apiPath}${url}${newParams}`;
};

export const fetchImage: FetchImageType = (url) => {
  return `${getStrapiDomain()}${url}`;
};

export const requestInit: RequestInitType = (body, method = 'POST') => {
  return {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8',
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    method,
    body: JSON.stringify(body),
    mode: 'cors',
  };
};

export const fetcher:FetcherType = (...args) => fetch(...args).then((res) => res.json());
