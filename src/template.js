export default ({ markup, title }) => {
  return `
    <!doctype html>
    <html>

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
      <link rel="stylesheet" href="/static/client.css">
      <title>${title}</title>
    </head>

    <body>
      <div id="app">
      ${markup}
      </div>
      <script src="/static/client.js" />
      <script>
        (function () {
          if ('serviceWorker' in navigator) {
          }
        })();
      </script>
    </body>

    </html>
  `;
};
