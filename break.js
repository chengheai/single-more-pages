const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

/**
 * 分离静态资源与html文件, 方便通过xftp上传
 */
async function breakStatic() {
  try {
    let files = await readdir(path.resolve(__dirname, './dist'));
    for (let i = 0; i < files.length; i++) {
      let stats = await stat(path.resolve(__dirname, `./dist/${files[i]}`));
      if (stats.isDirectory()) {
        let marfiles = await readdir(path.resolve(__dirname, `./dist/${files[i]}`));
        if (marfiles.indexOf('index.html') > -1) {
          if (!fs.existsSync(path.resolve(__dirname, `./html`))) {
            await mkdir(path.resolve(__dirname, `./html`));
          }
          if (!fs.existsSync(path.resolve(__dirname, `./html/${files[i]}`))) {
            await mkdir(path.resolve(__dirname, `./html/${files[i]}`));
          }
          let readStream = fs.createReadStream(
            path.resolve(__dirname, `./dist/${files[i]}/index.html`),
          );
          let writeStream = fs.createWriteStream(
            path.resolve(__dirname, `./html/${files[i]}/index.html`),
          );
          readStream.pipe(writeStream);
          readStream.on('end', async () => {
            fs.unlinkSync(path.resolve(__dirname, `./dist/${files[i]}/index.html`));
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

breakStatic();
