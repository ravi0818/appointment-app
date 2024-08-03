import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the import as necessary

export function useAuth() {
  const { token } = useSelector((state: RootState) => state.auth);
  console.log({ token });
  return !!token; // Returns true if token exists, false otherwise
}
