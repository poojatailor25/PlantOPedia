export interface IUser {
  userId: string;
  name: string;
  address: string;
  email: string;
  mobileNo: string;
  password: string;
  roleId: string;
  role: {roleType: string};
}
