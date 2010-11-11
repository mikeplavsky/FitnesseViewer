// This file was automatically generated from scenarios.soy.
// Please don't edit this file by hand.

if (typeof fitnesse == 'undefined') { var fitnesse = {}; }
if (typeof fitnesse.viewer == 'undefined') { fitnesse.viewer = {}; }


fitnesse.viewer.scenarios = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="fv-header"><div class="fv-view" id="fv-view-all">All Scenarios: ', soy.$$escapeHtml(opt_data.all_scenarios.length), '</div><div class="fv-view" id="fv-view-used">Used Scenarios: ', soy.$$escapeHtml(opt_data.scenarios.length), '</div><div class="fv-view" id="fv-view-funcs">Called Functions: ', soy.$$escapeHtml(opt_data.functions.length), '</div></div><div id="fv-scenarios-list">');
  var sList10 = opt_data.list;
  var sListLen10 = sList10.length;
  for (var sIndex10 = 0; sIndex10 < sListLen10; sIndex10++) {
    var sData10 = sList10[sIndex10];
    output.append('<div class="fv-scenario">', soy.$$escapeHtml(sData10.name), '</div>');
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};
