// HtmlWebpackPlugin插件的基本配置
const fs = require('fs')

const path = require('path')

let dirs = fs.readdirSync('./src')
let Pages = []
dirs.map(dn => {
  let entry = {}
  let stat = fs.lstatSync(path.join('./src/', dn))
  if (!stat.isDirectory()) {
    return
  }
  let htmlPath = path.join('./src/', dn, '/index.html')
  if (fs.existsSync(htmlPath)) {
    entry['template'] = './' + htmlPath
    entry['chunksName'] = dn
    entry['filename'] = './' + dn + '/index.html'
    Pages.push(entry)
  }
})
// console.log('Pages', Pages)
module.exports = Pages
