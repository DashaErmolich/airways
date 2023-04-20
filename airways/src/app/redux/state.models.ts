export interface AuthState {
  isAuth: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
}
