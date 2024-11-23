import { authEndpoint } from "@/constants";
import { LoginResponse } from "@/shared/gen/ts/proto/auth_service";
import { LoginRequest } from "@/ts/proto/auth_service";
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
  try {
    axiosResponse = await axios.post(authEndpoint + "signup", {
      email: username,
      password,
      fullName,
    });
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
