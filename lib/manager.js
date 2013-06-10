'use strict';

const ss = require('sdk/simple-storage');
const { when: unload } = require('sdk/system/unload');

const { AddonProvider } = require('addonprovider/addonprovider');

const { Scriptlet } = require('./scriptlet');

if (!ss.storage.scriptlets) {
  ss.storage.scriptlets = [];
}

let scriptlets = [];

function isIDUnique(id) {
  for each ( let s in scriptlets) {
  	if (s.id == id)
  	  return true;
  }
  return false;
}

function addScriptlet(details) {
  if (isIDUnique(details.id)) {
  	throw Error('The Scriptlet id is not unique');
  }

  details.id = makeID(details);

  ss.storage.scriptlets.push(details);
  scriptlets.push(new Scriptlet(details, 'install'));
}
exports.addScriptlet = addScriptlet;

function getScriptlets() {
  return scriptlets;
}
exports.getScriptlets = getScriptlets;

function removeScriptlet(scriptlet) {
  let i = scriptlets.indexOf(scriptlet);
  if (i < 0)
  	return;

  scriptlet.destroy();
  scriptlets.splice(i, 1);
  ss.storage.scriptlets.splice(i, 1);
}
exports.removeScriptlet = removeScriptlet;

function makeID(details) ["scriptlet@erikvold.com-", details.title.replace(/[a-z0-9]/gi, '-')].join("-");

AddonProvider({
  type: "scriptlet",
  uiPriority: 8005,
  localeKey: "Scriptlets",
  getAddonByID: function(id) {
    let scriptlets = getScriptlets();
    for (let x, i = 0; x = scriptlets[i]; i++) {
      if (id == x.id)
        return x;
    }
    return null;
  },
  getAddons: getScriptlets
});

// load Scriptlets
ss.storage.scriptlets.forEach(function(scriptlet) {
  scriptlets.push(new Scriptlet(scriptlet, 'load'));
});

// unload Scriptlets
unload(function() {
  scriptlets.forEach(function(scriptlet) {
    scriptlet.destroy();
  });
  scriptlets = [];
});
