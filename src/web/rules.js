const path = require('path')

module.exports = (options) => {
  const root = (options.root || options.dir)
  const dir = options.dir
  
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
      use: {
        loader: 'babel-loader',
        options: {
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
    }]
}