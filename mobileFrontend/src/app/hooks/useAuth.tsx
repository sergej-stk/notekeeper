import { useSelector } from "react-redux";
import { getToken } from "../store/sessionStore";

export default function useAuth() {
  const token: string | null = useSelector(getToken);

  if (token === null) {
    return false;
  }

  return true;
}
