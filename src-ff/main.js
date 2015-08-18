var { ToggleButton  } = require('sdk/ui/button/toggle');
var panels = require('sdk/panel');
var data = require("sdk/self").data;
var panel;

var button = ToggleButton({
  id: "squidthing",
  label: "Squid Thing",
  icon: {
    "16": data.url('icon-16.png'),
    "32": data.url('icon-32.png'),
    "48": data.url('icon-48.png')
  },
  onClick: function(state) {
    panel = panels.Panel({
    contentURL: 'https://splatoon.nintendo.net/schedule',
    contentScriptFile: data.url('localize.js'),
    contentStyleFile: data.url('styles.css'),
    width: 719,
    height: 520,
    onHide: function() {
      panel.destroy();
      button.state('window', {checked: false});
    }
  });
  },
  onChange: function(state) {
    if (state.checked) {
      panel.show({
        position: button
      });
    }
  }
});
