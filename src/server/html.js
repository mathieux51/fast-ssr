export default (filename, { html, styleTags }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="Description" content="Put your description here.">
  <title>Fast SSR</title>
  ${styleTags}
</head>
<body>
  <div id="root">${html}</div>
  <script src="/${filename || 'main.js'}"></script>
</body>
</html>
`
