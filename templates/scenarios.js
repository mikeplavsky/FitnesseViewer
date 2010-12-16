// This file was automatically generated from scenarios.soy.
// Please don't edit this file by hand.

if (typeof fitnesse == 'undefined') { var fitnesse = {}; }
if (typeof fitnesse.viewer == 'undefined') { fitnesse.viewer = {}; }


fitnesse.viewer.scenarios = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="fv-header"><div class="fv-view" id="fv-view-all"><span>All Scenarios: ', soy.$$escapeHtml(opt_data.all_scenarios), '</span> <span class="fv-show-all">show all</span></div><div class="fv-view" id="fv-view-used"><span>Used Scenarios: ', soy.$$escapeHtml(opt_data.scenarios), '</span> <span class="fv-show-all">show all</span></div><div class="fv-view" id="fv-view-funcs"><span>Used Functions: ', soy.$$escapeHtml(opt_data.functions), '</span> <span class="fv-show-all">show all</span></div><div class="fv-view" id="fv-view-unused"><span>Unused Scenarios: ', soy.$$escapeHtml(opt_data.unused_scenarios), '</span> <span class="fv-show-all">show all</span></div><div class="fv-view" id="fv-view-variables"><span>Variables: ', soy.$$escapeHtml(opt_data.variables), '</span> <span class="fv-show-all">show all</span></div></div><div id="fv-scenarios-list">');
  var sList14 = opt_data.list;
  var sListLen14 = sList14.length;
  for (var sIndex14 = 0; sIndex14 < sListLen14; sIndex14++) {
    var sData14 = sList14[sIndex14];
    output.append('<div class="fv-scenario">', soy.$$escapeHtml(sData14), '</div>');
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};
