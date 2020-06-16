import path from 'path'
import { Resolve } from 'webpack'

import { PackingOptions  } from '..'
  
export function all(options: PackingOptions): Resolve {
      return {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: options.watch ? {
          'react-dom': require.resolve('@hot-loader/react-dom')
        }: {},
        modules: [
          path.resolve(options.mainDir),
          path.resolve(options.mainDir, 'node_modules'),
          path.resolve(options.contextDir),
          path.resolve(options.contextDir, 'node_modules'),
          path.resolve(options.stackDir),
          path.resolve(options.stackDir, 'node_modules'),
          "node_modules"
        ]
      }
  }
  

 