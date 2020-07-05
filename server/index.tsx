import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../src/App";
import { ListFetcher } from "../src/api/request";
import { mediaStyles } from "../src/providers/MediaProvider";
import serialize from "serialize-javascript";

const PORT = process.env.PORT || 10080;
const app = express();

/*
using index:false to prevent ./build/index.html to be server by default by express
*/
app.use(
  express.static("./build", {
    index: false,
  })
);

/*
default root
 */
app.get("/*", async (req, res) => {
  try {
    /**
     * Not using router match path since we are working with two routes having the same component
     * If more routes to be added, a seperate route array need to be created with its own initial fetch function
     */
    const initialData = await ListFetcher(
      `search?tags=story${
        req.url && req.url !== "/" ? `&page=${req.url.replace("/", "")}` : ""
      }`
    );

    const context = { initialData };
    const app = ReactDOMServer.renderToStaticNodeStream(
      /* Static router types doenst support adding custom keys to context object so casting it to any */
      <StaticRouter location={req.url} context={context as any}>
        <App />
      </StaticRouter>
    );

    const indexFile = path.resolve("./build/index.html");
    /* 
    Reading html generated by react scripts and replace with rendered app to keep the cache bust and precaching in CRA intact
  */
    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Oops, better luck next time!");
      }
      data = data.replace(
        '<style id="fresnel"></style>',
        `<style type="text/css">${mediaStyles}</style>`
      );
      data = data.replace(
        '<script id="initialData"></script>',
        `<script>window.__initialData__ = ${serialize(initialData)}</script>`
      );
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      );
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    return res.status(500).send("Oops, better luck next time!");
  }
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
