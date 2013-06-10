'use strict';

const tabs = require('sdk/tabs');
const cm = require("sdk/context-menu");
const { URL } = require('sdk/url')

const { addScriptlet } = require("./manager");

cm.Item({
  label: "Make Scriptlet",
  context: cm.SelectorContext("a"),
  contentScript: 'self.on("context", function (node) {' +
                 '  return /^javascript:/.test(node.getAttribute("href"));' +
                 '});' +
                 'self.on("click", function (node, data) {' +
                 '  var imgs = document.querySelectorAll("img");' +
                 '  var imgSrcs = [];' +
                 '  for (var i = 0 ; i < imgs.length; i++)' +
                 '    imgSrcs.push(imgs[i].src);' +
                 '  self.postMessage({'+
                 	  'href: node.getAttribute("href"),'+
                 	  'title: node.getAttribute("title"),'+
                 	  'textContent: node.textContent'+
                    '});' +
                 '});',
  onMessage: function (details) {
    let downloadURL = URL(tabs.activeTab.url);
    details.title = details.title || details.textContent.substring(0, 250);
    details.iconURL = tabs.activeTab.favicon;
    details.creator = downloadURL.host;
    details.homepageURL = downloadURL.toString();
    details.enabled = true;

    addScriptlet(details);
  }
});

