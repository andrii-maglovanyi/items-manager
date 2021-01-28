export type Item = {
  id: number;
  title: string;
};

export type UserData = {
  id: number;
  email: string;
  fullName: string;
};

export interface State {
  auth: UserData;
  dialog: string;
  error: string;
}
