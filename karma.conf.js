// Karma configuration
// Generated on Fri May 24 2013 11:45:02 GMT+0000 (UTC)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  QUNIT,
  QUNIT_ADAPTER,
  'lib/jquery-1.4.4.js', 
  'tests/tests_add_css.js',
  'lib/base.js',
  'lib/deps.js',
  'templates/soyutils.js',
  'templates/scenarios.js',
  'core.js','ui.js', 'utils.js',
  'tests/karma_tests.js',
  'tests/core_tests.js',
  'tests/fitnesse.js',
  'tests/ui_tests.js',
];


// list of files to exclude
exclude = ['*.css'];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 8181;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
