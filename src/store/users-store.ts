import { create } from "zustand";
import { User } from "../models/User";

type UsersStore = {
  users: User[];
  setUsers: (users: User[]) => void;
};

export const useUserStore = create<UsersStore>()((set) => ({
  users: [],
  setUsers: (users: User[]) => set(() => ({ users })),
}));
