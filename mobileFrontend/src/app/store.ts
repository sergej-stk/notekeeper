import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
import sessionStoreReducer, { sessionStore } from "./store/sessionStore";
import uiStoreReducer from "./store/uiStore";
import { thunk } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
// ...

const persistConfig = {
  key: "session",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    sessionStore: persistReducer(persistConfig, sessionStoreReducer),
    //sessionStore: createStore(sessionStoreReducer, applyMiddleware(thunk)) as any,
    uiStore: uiStoreReducer,
  },
});

export const persistor = persistStore(store);

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
