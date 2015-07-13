var should = require("should")
var bbb_require = require("../src/index")
//'lively.TestFramework'
//'users.timfelgentreff.standalone.Compressor'


describe('bbb_src_transform', function() {
  it('requires a simple file.', function() {
      var func = bbb_require('./test/BabelsbergJsTestFiles/simpleFunction.bbb');
      func.should.be.a.Function;
      func().should.be.true();
  });
  it('requires a file containing a working constraint.', function() {
      var func = bbb_require('./test/BabelsbergJsTestFiles/simpleConstraint.bbb');
      func.should.be.a.Function;
      func().should.be.true();
  });
});
