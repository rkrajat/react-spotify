export type UserState = {
  user: IUserData;
  setUser: (data: IUserData) => void;
};

export interface IUserData {
  accessToken: string | null;
  tokenType?: string | null;
  expiresIn?: number | null;
  state?: string | null;
  refresh_token?: string | null;
  inSession?: boolean | null;
}
