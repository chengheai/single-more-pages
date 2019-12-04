var shell = require('shelljs');

console.log('开始将代码同步到测试服务器 Web 目录……\n');
console.log('开始将代码同步到 CDN 服务器……\n');
// shell.exec('./build/qrsync ./build/qiniu_test.json');
shell.exec('qshell qupload ./build/upload.conf');
console.log(['代码同步到七牛 CDN 成功'].join('\n'));
process.exit();
