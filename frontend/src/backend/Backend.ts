import { useMainStore } from "@/store/mainStore";
import axios, { AxiosResponse, HttpStatusCode } from "axios";

export enum HttpMethod {
  HTTP_METHOD_GET = "GET",
  HTTP_METHOD_POST = "POST",
  HTTP_METHOD_PUT = "PUT",
  HTTP_METHOD_PATCH = "PATCH",
  HTTP_METHOD_DELETE = "DELETE",
}

export async function backendCall(
  httpMethod: HttpMethod,
  url: string,
  body?: object
): Promise<AxiosResponse<any, any> | null> {
  const mainStore = useMainStore();

  let response = null;

  try {
    response = await axios({
      method: httpMethod.toString(),
      headers:
        mainStore.token !== null
          ? { Authorization: `Bearer ${mainStore.token}` }
          : undefined,
      url,
      responseType: "json",
      data: body,
    });
  } catch (e) {
    response = null;
  }

  if (response === null) {
    return null;
  }

  if (response.status === HttpStatusCode.Unauthorized) {
    mainStore.logout();
    return null;
  }

  return response;
}
