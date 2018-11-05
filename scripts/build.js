import { promisify } from 'util'
import fs from 'fs'

const copyFile = promisify(fs.copyFile)

async function main() {
  try {
    await copyFile('scripts/run.js', 'build/run.js')
  } catch (err) {
    console.error(err)
  }
}

main()
