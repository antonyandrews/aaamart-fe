export const API_PATHS = {
  version: '/api',
  auth: {
    signup: '/users',
    secureLog: '/auth/public-key',
    login: '/auth/login',
    refresh: '/auth/refresh-token',
    googleOauth: '/auth/google/token'
  },
  log: {
    logs: "/logs/client-log"
  }
}
