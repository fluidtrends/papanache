import path from 'path'

export function ConfigRules (options: any, dev: boolean): any[] {
  const root = (options.root || options.dir)
  const dir = options.dir
  const templateDir = options.templateDir || options.dir

  return [{
      test: /\.r.png$/,
      use: [{
        loader: 'responsive-loader',
        options: {
          sizes: [600, 2000],
          placeholder: true,
          placeholderSize: 50
        }
      }]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {}
      }
    },
    {
      test: /\.(svg|ttf|eot|woff)$/,
      use: {
        loader: 'raw-loader'
      }
    },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: { modules: true }
      }]
    },
    {
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader',
          options: {
          }
        }
      ]
    },
    {
      test: /\.(js|jsx)$/,
      include: [
        path.resolve(dir),
        path.resolve(templateDir)
      ],
      use: {
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(root, `.babelrc${dev ? '.dev' : ''}.json`),
          presets: [
            [path.resolve(root, 'node_modules', '@babel/preset-env'), {
              loose: true,
              modules: false
            }],
            path.resolve(root, 'node_modules', '@babel/preset-react'),
          ],
          plugins: [
            require.resolve('react-hot-loader/babel'),
            require.resolve('styled-jsx/babel')
          ]
        }
      }
    }, 
    {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
          {
              loader: "ts-loader"
          }
      ]
    },
    {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    }]
}