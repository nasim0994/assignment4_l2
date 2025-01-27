import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface TError {
  data: {
    message: string;
    stack: string;
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
