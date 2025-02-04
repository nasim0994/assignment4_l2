export interface TErrors {
  message: string;
  path: string;
}

export interface TError {
  data: {
    error: TErrors[];
    message: string;
    stack: string;
    statusCode: number;
    success: boolean;
  };
  status: number;
}

export interface TMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface TResponse {
  data?: any;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
}

export interface TQueryParam {
  name: string;
  value: boolean | React.Key;
}
