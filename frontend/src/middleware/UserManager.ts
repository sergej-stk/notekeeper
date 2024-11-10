import { User } from "@/types";

export function login(username: string, password: string): User | null {
  if (username === "a" && password === "a") {
    return {
      id: 1,
      username: "asd",
    };
  }
  return null;
}
