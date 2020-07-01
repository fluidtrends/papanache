import images from './images'
import styles from './styles'
import text from './text'
import ts from './ts'

import { 
  PackingOptions 
} from '../..'

export function all (options: PackingOptions): any[] {
  return [
      ...images(options), 
      ...styles(options),
      ...text(options),
      ...ts(options)
  ]
}