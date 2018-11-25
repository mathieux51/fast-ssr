export const isProd = typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'production'

export const isDev = !isProd
