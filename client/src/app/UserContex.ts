import { createContext } from "react";
import type { IUser } from "../types/userTypes";

interface UserContextType {
  user: IUser | null;
  handleLogOut(): Promise<void>;
  handleLogIn(user: IUser): void;
  setUser(user: IUser | null): void;
}

export const UserContext = createContext<UserContextType | null>(null);
