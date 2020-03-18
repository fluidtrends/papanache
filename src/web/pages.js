const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs-extra')
const { createSectionRoutes } = require('./router')

function generateDevPage (options, route) {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    route,
    inject: true,
    template: options.page
  })
}

function generateStaticPage (options, route) {
  var filename = `${(route.path && route.path !== '/') ? route.path + '/' : ''}index.html`
  if (filename[0] === '/') {
    filename = filename.substring(1)
  }

  return new HtmlWebpackPlugin({
    cache: false,
    route,
    inject: true,
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    },
    filename,
    template: options.page
  })
}

function sectionRoutes (section, options) {
  var r = []
  for (const routeName in section.routes) {
    const route = section.routes[routeName]

    if (!route.path || (route.path && route.path.indexOf(':path') < 0)) {
      r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? `${route.path}` : '/') }))
      break
    }

    if (!route.pathData) {
      return []
    }

    try {
      const variants = require(path.resolve(options.dir, options.sectionsRoot, section.name, 'data', `${route.pathData}.json`))
      if (!variants || variants.length === 0) {
        return []
      }

      variants.forEach(variant => {
        const newPath = route.path.replace(/:path/g, variant.path)
        r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? `/${route.path}` : '/'), path: newPath }, variant))
      })
    } catch (e) {
    }
  }
  return r
}

function routes (options) {
  var r = []

  for (const sectionName in options.sections) {
    const section = options.sections[sectionName]
    const sectionRoutes = createSectionRoutes(section, (element, section) => {
      var section

      options.sections.forEach(c => {
        if (s.name === element) {
          section = Object.assign({}, s)
        }
      })

      if (section && section.routes && Object.keys(section.routes).length > 0) {
        r = r.concat(sectionRoutes(section, options))
      }
    })
  }

  return r
}

function pages (options, dev) {
  const r = routes(options)

  if (dev) {
    return [generateDevPage(options, r[0])]
  }

  // Add static pages
  return r.map(route => generateStaticPage(options, route))
}

module.exports = pages
