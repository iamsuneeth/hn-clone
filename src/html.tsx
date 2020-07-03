import React from "react";
import App from "./App";
export const Html = () => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <title>Server Side Rendered React App!!</title>
    </head>
    <body>
      <div id="root">
        <App />
      </div>
    </body>
  </html>
);
