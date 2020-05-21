import path from 'path'
import fs from 'fs-extra'
import browserSync from 'browser-sync'
const bs = browserSync.create()

export async function preview (options: any): Promise<any> { 
    return new Promise((resolve, reject) => {
        const dir = path.resolve(options.dir, `.${options.name}`, 'web')

        if (!fs.existsSync(dir)) {
            reject(new Error("Make sure you build the app first"))
            return 
        }

        bs.init({
            server: dir
        })
        bs.reload("index.html")
        resolve()
    })
}
