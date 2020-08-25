import React from 'react';
// renderToString - рендерит не в DOM, а в строку
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {matchRoutes, renderRoutes} from 'react-router-config';
import express from 'express';
import {Provider} from 'react-redux';
import serialize from 'serialize-javascript';
import '@babel/polyfill';

import Routes from "./Routes";
import {store} from "./store";
import {assetsByChunkName} from "../dist/stats.json"

const app = express();

app.use(express.static('dist'));

// это то, что будет нам выдавать html файлы, на основе разметки которой будет все рендерится
const renderer = (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      {/* вместо BrowserRouter использует StaticRouter для сервера, передаем path и context */}
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/${assetsByChunkName.main[0]}"/>
    <title>Webpack dev-server</title>
  </head>
  <body>
  <div id="root">${content}</div>
<!--  то состояние, которое создастся, window присвоится у user'a. Bundl react'a не будет fetch'ить и не будет брать 
данные с сервера еще раз, потому что они уже будут в store. Дополнительно сериализуется, экранируется-->
  <script>
    window.__PRELOADER_STATE__ = ${serialize(store.getState()).replace(/</g, '\\u003c')}
  </script>
  <!--  интересный способ добавления хеша-->
  <script src="/${assetsByChunkName.main[1]}"
  </body>
  </html>`
};


app.get('*', (req, res) => {
  const params = req.params[0].split('/');
  const id = params[2];

  const routes = matchRoutes(Routes, req.path);

  const promises = routes
    .map(({route}) => {
      return route.loadData ? route.loadData(store, id) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve)
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(4000, () => {
  console.log('Server on port 4000')
})