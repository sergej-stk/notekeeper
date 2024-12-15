import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { useState } from "react";
import requester from "@/src/constants/requester";
import { SetState } from "@/src/constants/types";
import { useSelector } from "react-redux";
import { getToken, setState, useSessionStore } from "../../store/sessionStore";
import { store } from "../../store";
import { Me } from "./apiHooks/useMe";
import base64 from "base-64";

export type RequesterOptions = {
  endpoint: string;
  protocol: "http" | "https";
};

export enum HttpMethod {
  HTTP_METHOD_POST = "post",
  HTTP_METHOD_GET = "get",
}

export type Body<T extends Object = Object> = T & {};

type KnownHeaders = {};

export type Headers = Record<string | any, string | any>;
export type ErrorResponseData = {
  error?: any;
};
export type RequesterResponseData = {
  original?: AxiosResponse;
};
export type GenericResponseData<T = any> = RequesterResponseData & T;

type D = any;

async function request(
  method: HttpMethod,
  url: string,
  data: D,
  config: AxiosRequestConfig<D>,
): Promise<AxiosResponse | null> {
  let response: AxiosResponse | null = null;
  let axiosInstance: (
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) => Promise<AxiosResponse>;

  //url = url.endsWith("/") ? url : url + "/";

  try {
    switch (method) {
      case HttpMethod.HTTP_METHOD_POST:
        axiosInstance = async (
          url: string,
          data?: D,
          config?: AxiosRequestConfig<D>,
        ) => {
          console.log("post");
          return await axios.post(url, data, config);
        };
        break;
      case HttpMethod.HTTP_METHOD_GET:
        axiosInstance = async (
          url: string,
          data?: D,
          config?: AxiosRequestConfig<D>,
        ) => {
          console.log("get");
          return await axios.get(url, config);
        };
        break;
      default:
        throw new Error("default");
    }
  } catch (e) {
    alert("bad");
    return null;
  }

  try {
    response = await axiosInstance(url, data, config);
  } catch (e) {
    response = null;
  }

  if (response === null) {
    return null;
  }

  return response;
}
/*
async function requestWrapper<T extends RequesterResponseData>(
  options: RequesterOptions,
  state: SetState,
  method: HttpMethod,
  api: string,
  body?: Object,
  headers?: Headers,
) {
  const [setData] = state;

  const endpoint = `${options.protocol}://${options.endpoint}`;
  api = Path.join(endpoint, api);

  const response = await request(method, api, body, headers);

  setData(response);

  return response;
}*/

type Requester<GenericResponseData> = (
  method: HttpMethod,
  url: string,
  data: D,
  config: AxiosRequestConfig<D>,
  anonymCall?: boolean,
) => Promise<GenericResponseData>;

export function useRequester<T = {}>(): Requester<GenericResponseData> {
  //const [data, setData] = useState<T | null>(null);
  // const sessionStore = useSessionStore();
  const { token } = store.getState().sessionStore;

  return async (
    method: HttpMethod,
    url: string,
    data: D,
    config: AxiosRequestConfig<D>,
    anonymCall?: boolean,
  ): Promise<GenericResponseData> => {
    const finalConfig: AxiosRequestConfig<D> = { ...config, headers: {} };
    if (finalConfig.headers === undefined) {
      finalConfig.headers = {};
    }
    if (token !== null) {
      finalConfig.headers.Authorization = "Bearer:" + token;
    }

    const endpoint = `${requester.protocol}://${requester.endpoint}`;
    url = endpoint.endsWith("/") ? endpoint + url : endpoint + "/" + url;

    const response = await request(method, url, data, finalConfig);

    if (response === null) {
      return {
        original: null,
      };
    }

    const requesterResponse: GenericResponseData<T> = {
      original: response,
      ...response.data,
    };

    if (response.status === HttpStatusCode.Unauthorized) {
      //alert("auto logout");
      alert("not authorized");
      store.dispatch(
        setState({
          token: null,
          loginError: false,
          me: null,
        }),
      );
      return requesterResponse;
    }

    return requesterResponse;
  };
}
