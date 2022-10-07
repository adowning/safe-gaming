/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import { Hono } from 'hono'
// import { poweredBy } from 'hono/powered-by'
// import { basicAuth } from 'hono/basic-auth'
// import tabletojson from 'table2json'
// import xray from 'xray'
// const app = new Hono()

// // Builtin middleware
// app.use('*', poweredBy())
// // Basic Auth
// app.use(
//   '/auth/*',
//   basicAuth({
//     username: 'hono',
//     password: 'acoolproject',
//   }),
// )

// // Custom middleware
// app.use('*', async (c, next) => {
//   await next()
//   c.header('X-message', 'Hono is a cool project')
// })

// // Routing
// app.get('/', c => c.html('<h1>Hello Hono!</h1>'))
// app.get('/auth/*', c => c.text('You are authorized'))

// // Nested route
// const book = new Hono()
// // Named path parameters
// book.get('/:id', (c) => {
//   const id = c.req.param('id')
//   return c.json({ 'Your book ID is': id })
// })
// book.get('/scrape', async (c) => {
//   console.log('scraping')

//   const d = await fetch(storageUnitsPricingNoClimateControl)
//   console.log(d)
//   const result = xray(d, ['table@html'])((conversionError, tableHtmlList) => {
//     if (conversionError) {
//       // return reject(conversionError);
//       throw (conversionError)
//     }
//     console.log(tableHtmlList)
//     return (tableHtmlList.map((table) => {
//       // xray returns the html inside each table tag, and tabletojson
//       // expects a valid html table, so we need to re-wrap the table.
//       // Returning the first element in the converted array because
//       // we should only ever be parsing one table at a time within this map.
//       return tabletojson.Tabletojson.convert(`<table>${table}</table>`)[0]
//     }))
//   })
//   console.log(result)
//   return c.json({ 'Your book ID is': result })
// })
// book.post('/', c => c.text('Book is created', 201))
// app.route('/book', book)

// export default app
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

const storageUnitsPricingNoClimateControl
  = 'https://www.sparefoot.com/Tyler-TX-self-storage.html?location=Tyler%2C%20TX%2075701%2C%20USA&latitude=32.3243856&longitude=-95.29979589999999&zip=75701&informedSexarch=true'

class Scraper {
  constructor(params) {
    this.__defaults()
    this.__setParameters(params)
  }

  async scrape() {
    const url = this.url
    await fetch(url)
      .then((req) => {
        console.log(req)
        return req.text()
      })
      .then((resp) => {
        const parser = new DOMParser()
        const html = parser.parseFromString(resp, 'text/html')

        let table
        console.log(this.table_id)
        // if user is looking for a specific table by id
        if (this.table_id !== undefined)
          table = html.getElementById(`${this.table_id}`)
        else table = html.getElementsByTagName('table')[0]

        const headers = []

        let has_thead = table.querySelector('thead') == null
        if (has_thead === false)
          has_thead = true
        else has_thead = false

        if (has_thead) {
          let thead = table.querySelector('thead')
          thead = thead.querySelector('tr')
          thead.querySelectorAll('th').forEach((col) => {
            headers.push(col.innerText)
          })
        }

        const rows = []

        const tbody = table.querySelector('tbody')

        tbody.querySelectorAll('tr').forEach((row, index) => {
          if (index === 0 && !has_thead) {
            row.querySelectorAll('th').forEach((col) => {
              headers.push(col.innerText)
            })
          }
          else {
            const data = []
            row.querySelectorAll('td').forEach((col) => {
              data.push(col.innerText)
            })
            rows.push(data)
          }
        })

        this.headings = headers
        this.data = rows
      })
      .catch((error) => {
        throw (new Error(`scraping ${url} failed: ${error}`))
      })

    if (this.dump !== undefined) {
      const elem = document.getElementById(`${this.dump}`)
      elem.innerHtml = ''
      const tr = document.createElement('tr')

      this.headings.forEach((heading) => {
        const th = document.createElement('th')
        th.innerText = `${heading}`
        tr.appendChild(th)
      })

      const thead = document.createElement('thead')
      thead.appendChild(tr)
      elem.appendChild(thead)

      const tbody = document.createElement('tbody')

      this.data.forEach((row) => {
        const tr = document.createElement('tr')

        row.forEach((value) => {
          const td = document.createElement('td')
          td.innerText = `${value}`
          tr.appendChild(td)
        })

        tbody.appendChild(tr)
      })

      elem.appendChild(tbody)
    }
  }

  __setParameters(params) {
    if (params.url !== undefined)
      this.url = params.url

    if (params.proxy !== undefined)
      this.proxy = params.proxy

    if (this.url !== undefined && this.proxy !== undefined)
      this.url = this.proxy + this.url

    if (params.table_id !== undefined)
      this.table_id = params.table_id

    if (params.dump !== undefined)
      this.dump = params.dump
  }

  __defaults() {
    this.url = undefined
    this.proxy = undefined
    this.table_id = undefined
    this.headings = []
    this.data = []
    this.dump = undefined
  }

  summary() {
    console.log(`results for ${this.url}`)

    if (this.headings.length !== 0)
      console.log(`found ${this.headings.length} headings`)

    console.log(`found ${this.data.length} rows`)
  }
}

addEventListener('fetch', (event) => {
  const data = {
    hello: 'worldx',
  }

  const json = JSON.stringify(data, null, 2)
  const scraper = new Scraper({ url: storageUnitsPricingNoClimateControl, table_id: '.content-table' })
  scraper.scrape().then((d) => {
    console.log(d)
    scraper.summary().then(() => {
      return event.respondWith(
        new Response(json, {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        }),
      )
    })
  })
})
