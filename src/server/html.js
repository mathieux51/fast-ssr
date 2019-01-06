import isObject from 'is-object'

function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets)
  }
  return Array.isArray(assets) ? assets : [assets]
}

const html = (_head, lang = 'en') => `<!DOCTYPE html>${_head}<html lang="${lang}">`
// Update me with the stream version of fs.readFileSync
// to have the content of the css file.
const head = (css, publicPath) => `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="Description" content="Put your description here.">
    <title>Fast SSR - 🦉</title>
    ${normalizeAssets(css)
    .map(path => `<link rel="stylesheet" type="text/css" href="${publicPath + path}">`)
    .join('\n')}
  </head>`

export const scripts = (js, publicPath) => normalizeAssets(js)
  .map(path => `<script src="${publicPath + path}"></script>`)
  .join('\n')

export const htmlStart = (css, publicPath) => `${html(head(css, publicPath))}<body><div id="root">`
export const htmlEnd = (js, publicPath) => `</div>${scripts(js, publicPath)}</body></html>`
