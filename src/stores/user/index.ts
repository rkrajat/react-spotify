import create from "zustand";
import { IUserData, UserState } from "./interface";

export const DEFAULT_USER_DATA: IUserData = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
  state: null,
  refresh_token: null,
};

const useUserStore = create<UserState>((set) => ({
  user: DEFAULT_USER_DATA,
  setUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
}));

export default useUserStore;
