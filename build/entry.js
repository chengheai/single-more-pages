// webpack entry 设置文件
const fs = require('fs')

const path = require('path')

let entry = {}
let dirs = fs.readdirSync('./src')

dirs.map(dn => {
  let stat = fs.lstatSync(path.join('./src/', dn))
  if (!stat.isDirectory()) {
    return
  }
  let jsPath = path.join('./src/', dn, 'js/index.js')
  if (fs.existsSync(jsPath)) {
    entry[dn] = './' + jsPath
  }
})
// console.log(entry, 'entry')
module.exports = entry
