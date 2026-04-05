export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}
export interface GoogleLoginDto {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}
export interface LogoutDto {
  userId: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}
