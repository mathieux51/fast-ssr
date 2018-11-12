const Redis = require('ioredis')
const crypto = require('crypto')

// const isProd = typeof process.env.NODE_ENV === 'undefined' ||
// process.env.NODE_ENV === 'production'
// const isDev = !isProd
const BUILD_CACHE_TIMEOUT = 24 * 3600

const redis = new Redis({
  host: 'localhost',
  port: 6379,
})

function digest(str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
}

// Generate own cache key
function cacheKey(options, request) {
  return `build:cache:${digest(request)}`
}

// Read data from database and parse them
function read(key, callback) {
  redis.get(key, (err, result) => {
    if (err) {
      return callback(err)
    }

    if (!result) {
      return callback(new Error(`Key ${key} not found`))
    }

    try {
      const data = JSON.parse(result)
      return callback(null, data)
    } catch (e) {
      return callback(e)
    }
  })
}

// Write data to database under cacheKey
function write(key, data, callback) {
  redis.set(key, JSON.stringify(data), 'EX', BUILD_CACHE_TIMEOUT, callback)
}

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheKey,
    read,
    write,
  },
}

module.exports = cacheLoader
