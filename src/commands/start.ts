import path from 'path'
import fs from 'fs-extra'

import webpack, { Compiler, Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { DevConfig as makeConfig } from '../config'
import { 
  PackingOptions,
  PackingInstance
} from '../..'

const options =  (dir: string) => ({
  watch: true,
  name: 'app',
  port: 9999,
  srcDir: path.resolve(dir),
  targetDir: path.resolve(dir, `.${name}`, 'web')
} as PackingOptions)

const opts = options(process.cwd())
