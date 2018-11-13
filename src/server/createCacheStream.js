import { Transform } from 'stream'
import redis from './redis'

const createCacheStream = (key) => {
  const bufferedChunks = []
  return new Transform({
    transform(data, enc, cb) {
      bufferedChunks.push(data)
      cb(null, data)
    },

    flush(cb) {
      redis.set(key, Buffer.concat(bufferedChunks), 'ex', 1)
      cb()
    },
  })
}

export default createCacheStream
