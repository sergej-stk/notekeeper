import { authEndpoint } from "@/constants";
import axios, { AxiosResponse } from "axios";

export async function login(
  username: string,
  password: string
): Promise<string | null> {
  let axiosResponse: AxiosResponse | null = null;
  try {
    axiosResponse = await axios.post(authEndpoint + "login", {
      email: username,
      password,
    });
  } catch (e) {
    return null;
  }

  if (axiosResponse === null) {
    return null;
  }

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
