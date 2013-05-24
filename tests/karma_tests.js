test( 'just checking karma', function() {
  QUnit.equal(7, 7, "7 is 7");
});

test( 'Visible', function() { 

  ok(fitnesse.viewer, 'viewer');
  ok(fitnesse.viewer.core, 'core');
  ok(fitnesse.viewer.core.all_scenarios, 'all_scenarios');

});                                       
