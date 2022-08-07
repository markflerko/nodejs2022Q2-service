export interface TokenPayload {
  userId: string;
  login: string;
  iat?: number;
  exp?: number;
}

export default TokenPayload;
