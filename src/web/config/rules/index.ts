import images from './images'
import html from './html'
import text from './html'
import ts from './ts'

export function ConfigRules (): any[] {
  return [
      ...images(), 
      ...html(),
      ...text(),
      ...ts()
  ]
}