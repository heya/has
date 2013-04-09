/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
(["module", "heya-unit", "../sniff"],
function(module, unit, has){
	"use strict";

	// tests

	unit.add(module, [
		function test_browser(t){
			eval(t.TEST("has('host-browser') === (typeof process == 'undefined')"));
		},
		function test_add_delayed_cached(t){
			var x = 42;
			// add
			has.add("counter1", function(){ return x; });
			x = 13;
			eval(t.TEST("has('counter1') === 13"));
			x = 42;
			eval(t.TEST("has('counter1') === 13"));
			// immediate
			has.add("counter2", function(){ return x; }, true);
			x = 13;
			eval(t.TEST("has('counter2') === 42"));
			x = 42;
			eval(t.TEST("has('counter2') === 42"));
			// failed to replace
			has.add("counter1", function(){ return x; });
			x = 88;
			eval(t.TEST("has('counter1') === 13"));
			x = 55;
			eval(t.TEST("has('counter1') === 13"));
			// forced
			has.add("counter1", function(){ return x; }, true, true);
			x = 88;
			eval(t.TEST("has('counter1') === 55"));
			x = 42;
			eval(t.TEST("has('counter1') === 55"));
		},
		function test_svg_in_phantomjs(t){
			eval(t.TEST("has('host-browser') && has('phantomjs') ? has('svg') : true"));
		}
	]);

	unit.run();
});
