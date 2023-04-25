export interface AuthState {
  isAuth: boolean;
  error: string | null;
  dateFormat: string;
  currency: string;
  token: string | null;
}

export interface AppState {
  auth: AuthState;
}
