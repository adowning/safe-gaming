import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { basicAuth } from 'hono/basic-auth'
import { scrapTable } from 'puppeteer-table-scraper'
const storageUnitsPricingNoClimateControl
  = 'https://www.sparefoot.com/Tyler-TX-self-storage.html?location=Tyler%2C%20TX%2075701%2C%20USA&latitude=32.3243856&longitude=-95.29979589999999&zip=75701&informedSearch=true'

const app = new Hono()

// Builtin middleware
app.use('*', poweredBy())
// Basic Auth
app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  }),
)

// Custom middleware
app.use('*', async (c, next) => {
  await next()
  c.header('X-message', 'Hono is a cool project')
})

// Routing
app.get('/', c => c.html('<h1>Hello Hono!</h1>'))
app.get('/auth/*', c => c.text('You are authorized'))

// Nested route
const book = new Hono()
// Named path parameters
book.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ 'Your book ID is': id })
})
book.post('/', c => c.text('Book is created', 201))
book.get('/scrape', async (c) => {
  const data = await scrapTable(storageUnitsPricingNoClimateControl, '.content-table-cell')
  return c.json({ 'Your book ID is': data })
})

app.route('/book', book)
export default app



'use strict';
var request = require('request');
var xray = require('x-ray')();
var tabletojson = require('tabletojson').Tabletojson;

module.exports.get = function get(url, options = {}) {
  return new Promise(function (resolve, reject) {
    const requestOptions = {
      ...options,
      method: 'GET',
      url: url,
    };
    request.get(requestOptions, function (err, response, body) {
      if (err) {
        return reject(err);
      }
      if (response.statusCode >= 400) {
        return reject(new Error('The website requested returned an error!'));
      }
      xray(body, ['table@html'])(function (conversionError, tableHtmlList) {
        if (conversionError) {
          return reject(conversionError);
        }
        resolve(
          tableHtmlList.map(function (table) {
            // xray returns the html inside each table tag, and tabletojson
            // expects a valid html table, so we need to re-wrap the table.
            // Returning the first element in the converted array because
            // we should only ever be parsing one table at a time within this map.
            return tabletojson.convert('<table>' + table + '</table>')[0];
          })
        );
      });
    });
  });
};