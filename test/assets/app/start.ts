#!/usr/bin/env ts-node-script

import path from 'path'
import { start } from '../../../src/web/commands'

// const options = {
//     name: 'test',
//     once: false, 
//     dir: process.cwd(),
//     page: "index.html",
//     script: "index.tsx",
//     root:  path.resolve(__dirname, '../../..'),
//     config: {
//       info: {
//         test: "hello"
//       }
//     },
//     port: 9999,
//     sections: [{
//       name: "intro"
//     }]
// }

start((msg: any) => {
    console.log(msg)
})