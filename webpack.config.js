const path = require("path")

module.exports = {
  mode: 'development',
  entry: './App.js',
  output: {
    // path: path.join(__dirname, "dist"),
    // filename: '[name].bundle.js'
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
          console.log('Compile is done!')
          setTimeout(() => {
            process.exit(0)
          })
        })
      }
    }
  ]
}
