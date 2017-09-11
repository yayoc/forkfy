interface Template {
  markup: string;
  title: string;
  preloadedState: {} | null;
}

export default ({ markup, title, preloadedState }: Template) => {
  return `
    <!doctype html>
    <html>

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
      <link rel="stylesheet" href="/static/client.css">
      <title>${title}</title>
      <style>
        html {
            font-family: sans-serif;
        }
      </style>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
    </head>

    <body>
      <div id="app">
      ${markup}
      </div>
      <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        "\\u003c"
      )}
      </script>
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
