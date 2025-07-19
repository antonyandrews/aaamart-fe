export interface UserSignup {
  firstName: string;
  lastName: string;
  email: string;
  type: string,
  encryptedKey: string;
  encryptedIv: string;
}

export interface UserLogin {
  email: string;
  password: string;
  encryptedKey: string;
  encryptedIv: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
  iv: string;
  key: string;
}

export interface SecureLog {
  secLog: string;
}

export interface UserLoginResponse {
  token: string;
  refreshToken: string;
}
