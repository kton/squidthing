var dictionary = {
  // Ranked Battle
  'ガチエリア': 'SplatZones',
  'ガチヤグラ': 'TowerControl',
  'ガチホコ': 'Rainmaker',

  // Multiplayer Maps
  'アロワナモール': 'ArowanaMall',
  'Ｂバスパーク': 'BlackbellySkatepark',
  'ネギトロ炭鉱': 'BluefinDepot',
  'モンガラキャンプ場': 'CampTriggerfish',
  'ヒラメが丘団地': 'FlounderHeights',
  'モズク農園': 'KelpDome',
  'タチウオパーキング': 'MorayTowers',
  'ホッケふ頭': 'PortMackerel',
  'シオノメ油田': 'SaltsprayRig',
  'デカライン高架下': 'UrchinUnderpass',
  'ハコフグ倉庫': 'WalleyeWarehouse'
};

for (var entry in dictionary) {
  dictionary[entry] = chrome.i18n.getMessage(dictionary[entry]);
}

function getJapanTime() {
  var date = new Date();
  var utc = date.getTime() - (date.getTimezoneOffset() * 60000);
  var japan = new Date(utc + (3600000 * 9)); // UTC+0900

  return japan;
}

function getTextNodesUnder(element) {
  var items = [];
  var walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  var n;
  while ((n = walk.nextNode())) {
    items.push(n);
  }

  return items;
}

var contents = document.querySelector('div.contents');
var strings = getTextNodesUnder(contents);

strings.forEach(function(string) {
  // japanese -> english
  if (dictionary[string.nodeValue]) {
    string.nodeValue = dictionary[string.nodeValue];
  } else

  // 8/17 11:00 ~ 8/17 15:00 -> ending/starting in x hours and x minutes
  if (string.nodeValue.indexOf(':00 ~ ') !== -1) {

    var duration = string.nodeValue.split(' ~ ');
    var time = getJapanTime();
    var year = time.getFullYear();

    var start = duration[0]; // '8/17 11:00'
    start = start.split(' ');
    start[0] += '/' + year; // 8/17/2015
    start[1] += ' UTC+0900'; // 11:00 UTC+0900
    start = start.join(' ');

    start = new Date(Date.parse(start)); // converts to local

    var diff = {ms: start - new Date()};

    diff.hours = Math.floor(diff.ms / 36e5);
    diff.mins = Math.floor((diff.ms % 36e5) / 6e4);

    if (diff.hours > 0) {
      diff.text = diff.hours + ' hours and ' + diff.mins + ' minutes';
    } else {
      diff.text = diff.mins + ' minutes';
    }

    if (diff.ms < 0) {
      string.nodeValue = 'current stages';
    } else {
      string.nodeValue = 'starting in ' + diff.text;
    }

  }

});
