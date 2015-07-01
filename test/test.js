var should = require("should")
var BabelsbergSrcTransform = require("../src/src_transform");

//'lively.TestFramework'
//'users.timfelgentreff.standalone.Compressor'


describe('bbb_src_transform', function() {
  describe('transformation', function() {
    it('transforms prolog rule with quotes.', function() {
        var src = "rule: 'abs(N,N) |- N>=0'";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("bbb.rule(\"abs(N,N):-N>=0\");");
    });

    it('transforms prolog rule with braces.', function () {
        var src = "rule: { abs(N,N) |- N>=0 }";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("bbb.rule(\"abs(N,N):-N>=0\");");
    });

    xit('transforms name in always.', function () {
        var src = "always: {name: c; a < b}";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("c=bbb.always({ctx:{c:c,a:a,b:b,_$_self:this.doitContext||this}},function(){returna<b;;});");
    });

    xit('transforms store in always.', function () {
        var src = "always: {store: c; a < b}";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("c=bbb.always({ctx:{c:c,a:a,b:b,_$_self:this.doitContext||this}},function(){returna<b;;});");
    });

    xit('transforms simple comparison.', function () {
        var src = "always: {a < b}";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("bbb.always({ctx:{a:a,b:b,_$_self:this.doitContext||this}},function(){returna<b;;});");
    });

    xit('transforms comparison with priority.', function () {
        var src = "always: {solver: cassowary; priority: 'high'; a < b}";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("bbb.always({solver:cassowary,priority:\"high\",ctx:{cassowary:cassowary,a:a,b:b,_$_self:this.doitContext||this}},function(){returna<b;;});");
    });

    xit('transforms trigger.', function () {
        var src = "var c = when(function() {a < b}).trigger(function () { alert });";
        var result = new BabelsbergSrcTransform().transform(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("varc=bbb.when({ctx:{a:a,b:b,_$_self:this.doitContext||this}},function(){returna<b;;}).trigger(function(){alert;});");
    });

    xit('transforms invariant true.', function () {
        var src = "always: { true }\n\
                    var late;\n";
        var result = new BabelsbergSrcTransform().transform(src);
        // asserts correct indenting, too
        result.should.be.exactly("bbb.always({\n" +
                               "    ctx: {\n" +
                               "        _$_self: this.doitContext || this\n" +
                               "    }\n" +
                               "}, function() {\n" +
                               "    return true;;\n" +
                               "});\n" +
                               "\n" +
                               "var late;");
    });

    xit('SCBTransformMulti', function () {
        var src = "always: {solver: cassowary; priority: 'high'; a < b}\n    always: {solver: cassowary; priority: 'high'; a < b}",
            panel = new lively.ide.BrowserPanel(pt(100,100)),
            editor = new lively.morphic.CodeEditor(rect(0,0,100,100), "    " + src);
        panel.addMorph(editor);
        editor.evalEnabled = false;

        cop.withLayers([ConstraintSyntaxLayer], function () {
            editor.doSave();
        });
        // asserts correct indenting, too
        result = "    bbb.always({\n" +
              "        solver: cassowary,\n" +
              "        priority: \"high\",\n" +
              "        ctx: {\n" +
              "            cassowary: cassowary,\n" +
              "            a: a,\n" +
              "            b: b,\n" +
              "            _$_self: this.doitContext || this\n" +
              "        }\n" +
              "    }, function() {\n" +
              "        return a < b;;\n" +
              "    });";
        result += "\n" + result;
        result.should.equal(textString);
    });

    xit('uses desfined solver after transformation.', function () {
        var src = "always: {solver: cassowary; priority: 'high'; a < b}",
            panel = new lively.ide.BrowserPanel(pt(100,100)),
            editor = new lively.morphic.CodeEditor(rect(0,0,100,100), "    " + src);
        panel.addMorph(editor);
        editor.evalEnabled = false;

        cop.withLayers([ConstraintSyntaxLayer], function () {
            editor.doSave();
        });
        // asserts correct indenting, too
        this.assert(editor.textString === "    bbb.always({\n" +
                                          "        solver: cassowary,\n" +
                                          "        priority: \"high\",\n" +
                                          "        ctx: {\n" +
                                          "            cassowary: cassowary,\n" +
                                          "            a: a,\n" +
                                          "            b: b,\n" +
                                          "            _$_self: this.doitContext || this\n" +
                                          "        }\n" +
                                          "    }, function() {\n" +
                                          "        return a < b;;\n" +
                                          "    });", editor.textString);
    });

    it('adds script.', function() {
        var src = "this.addScript(function () { foo })";
        var result = new BabelsbergSrcTransform().transformAddScript(src);
        result = result.replace(/[ \n\r\t]/g,"");
        result.should.be.exactly("this.addScript(function(){foo;},\"function(){foo}\");");
    });
  });

  xdescribe('minifying', function () {
    it('builds Minified Js (pt. 0)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["prototypejs", "core", "cassowary", "deltablue", "csp"], "babelsberg_mini_prototype");
    });

    it('builds Minified Js (pt. 1)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["core", "cassowary", "deltablue", "csp"], "babelsberg_mini");
    });

    it('builds Minified Js (pt. 2)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["core"], "babelsberg_core");
    });

    it('builds Minified Js (pt. 3)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["deltablue"], "babelsberg_deltablue");
    });

    it('builds Minified Js (pt. 4)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["cassowary"], "babelsberg_cassowary");
    });

    it('builds Minified Js (pt. 5)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["csp"], "babelsberg_csp");
    });

    it('builds Minified Js (pt. 6)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["sutherland"], "babelsberg_sutherland");
    });

    it('builds Minified Js (pt. 7)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["reactive"], "babelsberg_reactive");
    });

    it('builds Minified Js (pt. 8)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["z3"], "babelsberg_z3");
    });

    it('builds Minified Js (pt. 9)', function () {
        module("users.timfelgentreff.standalone.Compressor").load(true);
        users.timfelgentreff.standalone.Compressor.doAction(["backtalk"], "babelsberg_backtalk");
    });
  });
});
