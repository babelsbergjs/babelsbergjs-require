var BabelsbergSrcTransform = require('./src_transform.js')
var fs = require('fs');

module.exports = function bbb_require(filename) {
  var src = fs.readFileSync(filename, 'utf8');
  src = new BabelsbergSrcTransform().transform(src);
  module._compile(src, filename);
  return module.exports;
}
