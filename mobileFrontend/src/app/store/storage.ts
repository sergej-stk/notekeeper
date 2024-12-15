import AsyncStorage from "@react-native-async-storage/async-storage";

export type StorageData<T = Object> = (T & {} & Record<string, string>) | any;

export enum StorageType {
  STORAGE_TYPE_UI = "@Store:ui",
  STORAGE_TYPE_SESSION = "@Store:session",
}

export type Storages = {
  uiStore: StorageData;
  sessionStore: StorageData;
};

export async function loadStorageData<T = Object>(
  storageType: StorageType,
): Promise<StorageData<T> | null> {
  try {
    const value = await AsyncStorage.getItem(storageType.toString());
    if (value === null) {
      return null;
    }
    return JSON.parse(value) as StorageData<T>;
  } catch (e) {
    throw new LoadStorageError(e);
  }
}

export async function saveStorageData<T = Object>(
  storageType: StorageType,
  data: StorageData<T>,
) {
  console.log("saveStorageData");
  try {
    await AsyncStorage.setItem(storageType.toString(), JSON.stringify(data));
  } catch (e) {
    throw new SaveStorageError(e);
  }
}

export class SaveStorageError extends Error {
  constructor(public readonly e: unknown) {
    super();
  }
}

export class LoadStorageError extends Error {
  constructor(public readonly e: unknown) {
    super();
  }
}
