'use strict';

const tabs = require('sdk/tabs');

const { ToolbarButton } = require('toolbarbutton/toolbarbutton');
const { Addon } = require('addonprovider/addon');

function Scriptlet(details, reason) {
  const ID = details.id;
  const self = this;

  let options = {};
  options.name = details.title;
  options.type = "scriptlet";
  options.id = ID;
  //options.description = details.description;
  options.iconURL = details.iconURL;
  options.homepageURL = details.homepageURL;
  options.creator = {name: details.creator };
  options.uninstall = function () {
  	require("./manager").removeScriptlet(self);
  }

  let tbb = ToolbarButton({
    id: 'toolbarbutton-' + ID,
    label: details.title,
    tooltiptext: details.title,
    image: details.iconURL,
    onCommand: function() {
      tabs.activeTab.attach({
      	contentScript: details.href.replace(/^javascript:/, '')
      })
    }
  });

  if (reason == 'install') {
    tbb.moveTo({
      toolbarID: "nav-bar",
      forceMove: false // only move from palette
    });
  }

  this.destroy = tbb.destroy.bind(tbb);

  Addon.call(this, options)
}
Scriptlet.prototype = Addon.prototype;
exports.Scriptlet = Scriptlet;
