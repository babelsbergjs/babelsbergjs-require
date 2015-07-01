var BabelsbergSrcTransform = require('./src_transform.js')
var fs = require('fs');

module.exports = function bbb_require(filename) {
  var Module = module.constructor;
  var m = new Module();
  var src = fs.readFileSync(filename, 'utf8');
  src = new BabelsbergSrcTransform().transform(src);
  m._compile(src, filename);
  return m.exports;
}
