// This file was automatically generated from scenarios.soy.
// Please don't edit this file by hand.

if (typeof fitnesse == 'undefined') { var fitnesse = {}; }
if (typeof fitnesse.viewer == 'undefined') { fitnesse.viewer = {}; }


fitnesse.viewer.scenarios = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="fv-header"><div class="fv-view" id="fv-view-all">All Scenarios: ', soy.$$escapeHtml(opt_data.all_scenarios), '</div><div class="fv-view" id="fv-view-used">Used Scenarios: ', soy.$$escapeHtml(opt_data.scenarios), '</div><div class="fv-view" id="fv-view-unused">Unused Scenarios: ', soy.$$escapeHtml(opt_data.unused_scenarios), '</div><div class="fv-view" id="fv-view-funcs">Called Functions: ', soy.$$escapeHtml(opt_data.functions), '</div></div><div id="fv-scenarios-list">');
  var sList12 = opt_data.list;
  var sListLen12 = sList12.length;
  for (var sIndex12 = 0; sIndex12 < sListLen12; sIndex12++) {
    var sData12 = sList12[sIndex12];
    output.append('<div class="fv-scenario">', soy.$$escapeHtml(sData12), '</div>');
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};
