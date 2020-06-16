import images from './images'
import html from './html'
import text from './html'
import ts from './ts'

import { 
  PackingOptions 
} from '../..'

export function all (options: PackingOptions): any[] {
  return [
      ...images(options), 
      ...html(options),
      ...text(options),
      ...ts(options)
  ]
}