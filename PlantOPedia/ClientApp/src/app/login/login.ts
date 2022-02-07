export interface IUser {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: {roleType: string};
}
