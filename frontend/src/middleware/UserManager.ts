import { authEndpoint } from "@/constants";
import axios, { AxiosResponse } from "axios";

export async function login(
  username: string,
  password: string
): Promise<string | null> {
  const axiosResponse: AxiosResponse = await axios.post(
    authEndpoint + "login",
    {
      email: username,
      password,
    }
  );

  if (axiosResponse.status !== 200) {
    return null;
  }

  if (!axiosResponse.data.startsWith("token=")) {
    return null;
  }

  return axiosResponse.data.split("token=")[1];
}

export async function register(
  username: string,
  password: string,
  fullName: string
) {
  const axiosResponse: AxiosResponse = await axios.post(
    authEndpoint + "signup",
    {
      email: username,
      password,
      fullName,
    }
  );

  if (axiosResponse.status !== 200) {
    return false;
  }

  return true;
}
