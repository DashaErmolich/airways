export interface AuthState {
  isAuth: boolean;
  error: string | null;
  dateFormat: string;
  currency: string;
}

export interface AppState {
  auth: AuthState;
}
