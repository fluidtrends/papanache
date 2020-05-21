export function createSectionRoutes (section: any, generator: any) {
  if (!section || !section.stack) {
    // We don't even consider stackless sections
    return
  }

  // These are the routes that we need to compile for this section's navigator
  var routes: any[] = []
  var menu: any[] = []

  // Let's look through the stack and build some routes for this section's navigator
  section.stack.forEach((element: any) => {
    var elementRoutes: any[] = []
    if (element && typeof element === 'string') {
      // The first kind of element in the stack is a plain string, that signifies a chunk
      elementRoutes = elementRoutes.concat(generator(element, section))
    } else if (element && Array.isArray(element) && element.length > 0) {
      // Another type of element in the sack is a list of strings, that each signifies a chunk
      var composedRoutes: any[] = []
      element.forEach(subElement => { composedRoutes = composedRoutes.concat(generator(subElement, section)) })
      elementRoutes = elementRoutes.concat(composedRoutes)
    }

    routes = routes.concat(elementRoutes)
  })

  return { routes, menu }
}