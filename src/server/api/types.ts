export interface ApiSession {
  id: string;
  expiresAt: Date;
  token: string;
  userId: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: Date;
}

export interface ApiContext {
  Variables: {
    session?: ApiSession;
    rateLimit?: RateLimitInfo;
  };
}
