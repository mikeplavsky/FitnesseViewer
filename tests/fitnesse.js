// This file was automatically generated from fitnesse.soy.
// Please don't edit this file by hand.

if (typeof fitnesse == 'undefined') { var fitnesse = {}; }
if (typeof fitnesse.ui == 'undefined') { fitnesse.ui = {}; }


fitnesse.ui.scenario = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table><tr><td>Scenario</td><td>', soy.$$escapeHtml(opt_data.scenario), '</td></tr></table>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.complex_scenario = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table><tr><td>Scenario</td><td>', soy.$$escapeHtml(opt_data.scenario.name), '</td></tr>');
  var cList10 = opt_data.scenario.calls;
  var cListLen10 = cList10.length;
  for (var cIndex10 = 0; cIndex10 < cListLen10; cIndex10++) {
    var cData10 = cList10[cIndex10];
    output.append('<tr><td>', soy.$$escapeHtml(cData10), '</td></tr>');
  }
  output.append('</table>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.script = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table><tr><td>Script</td></tr>');
  var sList18 = opt_data.scenarios;
  var sListLen18 = sList18.length;
  for (var sIndex18 = 0; sIndex18 < sListLen18; sIndex18++) {
    var sData18 = sList18[sIndex18];
    output.append('<tr><td>', soy.$$escapeHtml(sData18), '</td></tr>');
  }
  output.append('</table>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.scenario_library = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="fitnesse_library">');
  var sList26 = opt_data.scenarios;
  var sListLen26 = sList26.length;
  for (var sIndex26 = 0; sIndex26 < sListLen26; sIndex26++) {
    var sData26 = sList26[sIndex26];
    fitnesse.ui.scenario({scenario: sData26}, output);
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.scripts = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="scripts">');
  var sList33 = opt_data.scripts;
  var sListLen33 = sList33.length;
  for (var sIndex33 = 0; sIndex33 < sListLen33; sIndex33++) {
    var sData33 = sList33[sIndex33];
    fitnesse.ui.script({scenarios: sData33}, output);
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};
