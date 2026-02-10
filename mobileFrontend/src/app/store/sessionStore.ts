import {
  createAsyncThunk,
  createSlice,
  createStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { HttpMethod, useRequester } from "../hooks/net/useRequester";
import {
  LoginRequest,
  LoginResponse,
} from "@/src/shared/gen/ts/proto/auth_service";
import { PayloadActionRtData } from "./types";
import { Me } from "../hooks/net/apiHooks/useMe";
import { useSelector } from "react-redux";

// Define a type for the slice state
interface SessionState {
  token: string | null | undefined;
  loginError: boolean | undefined;
  me: Me | null | undefined;
}

type OptionalSetter = {
  token?: string | null;
  loginError?: boolean;
  me?: Me | null;
};

// Define the initial state using that type
const initialState: SessionState = {
  token: null,
  loginError: false,
  me: null,
};

export const sessionStore = createSlice({
  name: "session",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      //alert("set token: " + action.payload)
      return { ...state, token: action.payload };
    },
    setState: (state, action: PayloadAction<OptionalSetter | SessionState>) => {
      /* const fields = Object.keys(action.payload);

      for (const field of fields) {
        Object.assign((state as any)[field], (action.payload as any)[field]);
      }*/

      const keys = Object.keys(action.payload);
      // const vals = Object.values(action.payload);

      let obj: Record<string, any> = { ...state };
      console.log("set");
      for (const key of keys) {
        if (key === undefined) {
          continue;
        }
        obj = {
          ...obj,
          [key]: action.payload[key as keyof typeof action.payload],
        };
        //Object.assign(obj[key as keyof typeof SessionState]);
      }

      console.log("object", JSON.stringify(obj));

      return obj as SessionState;

      //save(state);
    },
    setLoginError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loginError: action.payload,
      };
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadActionRtData<LoginRequest, boolean>) => {
      //    return fetchSecretSauce().then(
      //     sauce => dispatch(makeASandwich(forPerson, sauce)),
      //    error => dispatch(apologize('The Sandwich Shop', forPerson, error)),
      // )
    },
  },
});

export const performLogin = createAsyncThunk(
  "session/performLogin",
  async () => {
    //const bToken: string | null = useSelector(getToken);
    const requester = useRequester<LoginResponse>();
    const request = LoginRequest.create();
    request.password = "test";
    request.username = "test@test.de";
    let token: null | string = null;

    //const async = await new Promise<null | string>((resolve, reject) => {
    try {
      const response = await requester(
        HttpMethod.HTTP_METHOD_POST,
        "auth/login",
        request,
        {},
      );
      token = response.token;
    } catch (e) {
      token = null;
    }

    //})

    if (token === null) {
      return null;
    }

    console.log("performLogin -> token ", token);

    return token;
  },
);

export const performLogout = createAsyncThunk(
  "session/performLogout",
  async () => {
    setState({
      me: null,
      token: null,
    });
  },
);

export const { login, setState, setLoginError, setToken } =
  sessionStore.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value;
export const getLoginError = (state: RootState) =>
  (state.sessionStore as any).loginError;

export const getToken = (state: RootState) => (state.sessionStore as any).token;

export const getMe = (state: RootState) => (state.sessionStore as any).me;

export default sessionStore.reducer;

export const useSessionStore = () => createStore(sessionStore.reducer);
