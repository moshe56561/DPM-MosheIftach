export interface IUser {
  email: string;
  _id: string;
  token: string;
}

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean | null;
}

export interface ICardItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isEditing: boolean;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
