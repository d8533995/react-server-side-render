import React from 'react'

export default function Chrome ({ meta, state, title, children, stylejs, dll, app }) {
  return (
    <html lang="zh-CN">
      <head>
        <title>{title}</title>
        {meta && Object.keys(meta).map(i => <meta key={i} name={i} content={meta[i]} />)}
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
        <meta name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover,minimum-scale=1,maximum-scale=1,user-scalable=0" />
        <meta httpEquiv="Content-Security-Policy" content="img-src 'self';" />
        <link rel="stylesheet" type="text/css" href="<%- css %>" />
      </head>

      <body>
        {children}
        <script
          // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ =${state}`
          }}
        />
        <script crossOrigin src={stylejs}></script>
        <script crossOrigin src={dll}></script>
        <script crossOrigin src={app}></script>
      </body>

    </html>
  )
}
