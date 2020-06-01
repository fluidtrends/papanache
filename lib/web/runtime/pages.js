"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
function generateDevPage() {
    return new html_webpack_plugin_1.default({
        cache: false,
        filename: 'index.html',
        inject: false,
        template: 'assets/web/page.ejs'
    });
}
// function generateStaticPage (options: any, route: any) {
//   var filename = `${(route.path && route.path !== '/') ? route.path + '/' : ''}index.html`
//   if (filename[0] === '/') {
//     filename = filename.substring(1)
//   }
//   return new HtmlWebpackPlugin({
//     cache: false,
//     route,
//     inject: true,
//     minify: {
//       removeAttributeQuotes: true,
//       collapseWhitespace: true,
//       collapseInlineTagWhitespace: true,
//       conservativeCollapse: true,
//       removeComments: true
//     },
//     filename,
//     template: options.page
//   })
// }
// function sectionRoutes (section: any, options: any) {
//   var r = []
//   for (const routeName in section.routes) {
//     const route = section.routes[routeName]
//     if (!route.path || (route.path && route.path.indexOf(':path') < 0)) {
//       r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? `${route.path}` : '/') }))
//       break
//     }
//     if (!route.pathData) {
//       return []
//     }
//     try {
//       const variants = require(path.resolve(options.dir, options.sectionsRoot, section.name, 'data', `${route.pathData}.json`))
//       if (!variants || variants.length === 0) {
//         return []
//       }
//       variants.forEach((variant: any) => {
//         const newPath = route.path.replace(/:path/g, variant.path)
//         r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? `/${route.path}` : '/'), path: newPath }, variant))
//       })
//     } catch (e) {
//     }
//   }
//   return r
// }
// function routes (options: any) {
//   var r: any[] = []
//   for (const sectionName in options.config.app) {
//     const section = options.config.app[sectionName]
//     const sectionRoutesBuilder = createSectionRoutes(section, (element: any, section: any) => {
//       var appSection: any;
//       options.sections.forEach((s: any) => {
//         if (s.name === element) {
//           appSection = Object.assign({}, s)
//         }
//       })
//       if (appSection && appSection.routes && Object.keys(appSection.routes).length > 0) {
//         r = r.concat(sectionRoutes(appSection, options))
//       }
//     })
//   }
//   return r
// }
function pages() {
    // const r = routes(options)
    // if (dev) {
    return [generateDevPage()]; //options, r[0])]
    // }
    // Add static pages
    // return r.map(route => generateStaticPage(options, route))
}
exports.pages = pages;
//# sourceMappingURL=pages.js.map