import { backendCall, HttpMethod } from "@/backend/Backend";
import { authEndpoint, meEndpoint } from "@/constants";
import {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
} from "@/shared/gen/ts/proto/auth_service";
import { GetMeResponse } from "@/shared/gen/ts/proto/user_service";
import axios, { AxiosResponse } from "axios";

export async function login(
  username: string,
  password: string
): Promise<string | null> {
  let axiosResponse: AxiosResponse | null = null;
  const body: LoginRequest = {
    username,
    password,
  };
  try {
    axiosResponse = await axios.post(authEndpoint + "login", body);
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  const lr = LoginResponse.create(axiosResponse.data);

  return lr.token;
}

export async function register(
  username: string,
  password: string,
  fullName: string
) {
  let axiosResponse: AxiosResponse | null = null;
  const registerRequest: RegisterRequest = {
    username,
    password,
    fullName,
  };
  try {
    axiosResponse = await axios.post(authEndpoint + "signup", registerRequest);
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return false;
  }

  return true;
}

export async function getMe(): Promise<GetMeResponse | null> {
  const axiosResponse = await backendCall(
    HttpMethod.HTTP_METHOD_GET,
    meEndpoint
  );

  if (axiosResponse === null) {
    return null;
  }

  if (axiosResponse.status !== 200) {
    return null;
  }

  return axiosResponse.data;
}
