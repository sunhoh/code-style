'use strict';

// import all rules in lib/rules
module.exports.rules = {
  boundaries: require('./rules/boundaries'),
  'sort-import': require('./rules/sort-import'),
};
