/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack';
import { PackingOptions } from '..';
export declare function entries(options: PackingOptions): string[];
export declare function server(options: PackingOptions): Configuration;
