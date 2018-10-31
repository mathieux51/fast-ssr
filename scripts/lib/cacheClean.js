function cacheClean(event, path) {
  Object.keys(require.cache).forEach((filename) => {
    if (/\/ssr\/src\//.test(filename)) {
      delete require.cache[filename]
      console.log(`🗑 ${filename}`)
    }
  })
}

export default cacheClean
