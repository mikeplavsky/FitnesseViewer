// This file was automatically generated from fitnesse.soy.
// Please don't edit this file by hand.

if (typeof fitnesse == 'undefined') { var fitnesse = {}; }
if (typeof fitnesse.ui == 'undefined') { fitnesse.ui = {}; }


fitnesse.ui.scenario = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table><tr><td>Scenario</td><td>', soy.$$escapeHtml(opt_data.scenario.name), '</td></tr></table>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.script = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<table><tr><td>Script</td></tr>');
  var sList8 = opt_data.scenarios;
  var sListLen8 = sList8.length;
  for (var sIndex8 = 0; sIndex8 < sListLen8; sIndex8++) {
    var sData8 = sList8[sIndex8];
    output.append('<tr><td>', soy.$$escapeHtml(sData8), '</td></tr>');
  }
  output.append('</table>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.scenario_library = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="fitnesse_library">');
  var sList16 = opt_data.scenarios;
  var sListLen16 = sList16.length;
  for (var sIndex16 = 0; sIndex16 < sListLen16; sIndex16++) {
    var sData16 = sList16[sIndex16];
    fitnesse.ui.scenario({scenario: sData16}, output);
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};


fitnesse.ui.scripts = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="scripts">');
  var sList23 = opt_data.scripts;
  var sListLen23 = sList23.length;
  for (var sIndex23 = 0; sIndex23 < sListLen23; sIndex23++) {
    var sData23 = sList23[sIndex23];
    fitnesse.ui.script({scenarios: sData23}, output);
  }
  output.append('</div>');
  if (!opt_sb) return output.toString();
};
