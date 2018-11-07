import { promisify } from 'util'
import fs from 'fs'

import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'

const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)

const build = () => new Promise((res, rej) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) rej(err)
    res(stats)
  })
})

async function main() {
  try {
    const stats = await build()
    await writeFile(
      'build/stats.json',
      JSON.stringify({ filename: stats.compilation.chunks[0].files[0] }),
    )
    await copyFile('scripts/run.js', 'build/run.js')
  } catch (err) {
    console.error(err)
  }
}

main()
