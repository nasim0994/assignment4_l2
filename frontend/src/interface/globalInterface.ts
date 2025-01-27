import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface TError {
  data: {
    error: [
      {
        message: string;
        path: string;
      }
    ];
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

export interface TResponse<T> {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
}

export interface TResponseRedux<T> extends TResponse<T>, BaseQueryApi {}

export interface TQueryParam {
  name: string;
  value: boolean | React.Key;
}
