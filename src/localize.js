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
  'マサバ海峡大橋': 'HammerheadBridge',
  'モズク農園': 'KelpDome',
  'キンメダイ美術館': 'MuseumdAlfonsino',
  'タチウオパーキング': 'MorayTowers',
  'ホッケふ頭': 'PortMackerel',
  'シオノメ油田': 'SaltsprayRig',
  'デカライン高架下': 'UrchinUnderpass',
  'ハコフグ倉庫': 'WalleyeWarehouse'
};

for (var entry in dictionary) {
  dictionary[entry] = chrome.i18n.getMessage(dictionary[entry]);
}

// for non-English speakers
if (dictionary['ガチエリア'] !== 'Splat Zones') {

  var terms = [
    // Ranked Battle
    'Splat Zones', 'Tower Control', 'Rainmaker',

    // Multiplayer Maps
    'Arowana Mall', 'Blackbelly Skatepark', 'Bluefin Depot',
    'Camp Triggerfish', 'Flounder Heights', 'Hammerhead Bridge',
    'Kelp Dome', 'Museum d\'Alfonsino', 'Moray Towers', 'Port Mackerel',
    'Saltspray Rig', 'Urchin Underpass', 'Walleye Warehouse'
  ];

  terms.forEach(function(term) {
    dictionary[term] = term.replace(/\s/g, '').replace('\'', '');
    dictionary[term] = chrome.i18n.getMessage(dictionary[term]);
  });

}

// JP splatfest
dictionary['フェスの詳細は'] = ' '; // festival details
dictionary['公式サイト フェスページ'] = ' '; // official festival page
dictionary['をご覧ください。'] = ' '; // please visit

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
  // japanese -> english handler
  if (dictionary[string.nodeValue]) {
    string.nodeValue = dictionary[string.nodeValue];
  } else

  // time handler
  if (string.nodeValue.indexOf(' ~ ') !== -1 &&
      (string.nodeValue.indexOf(':00 ~ ') !== -1 || string.nodeValue.indexOf(') ~ ') !== -1)) {

    string.parentNode.setAttribute('title', string.nodeValue);

    var duration = string.nodeValue.split(' ~ ');
    var time = new Date();
    var year = time.getFullYear();
    var start = duration[0]; // '8/17 11:00' OR '10/05 at 11:00 p.m. (PDT)'


    // handler for japanese time format: 8/17 11:00 ~ 8/17 15:00
    if (string.nodeValue.indexOf(':00 ~ ') !== -1) { // japanese time format (NNID time)

      start = start.split(' ');
      start[0] += '/' + year; // 8/17/2015
      // start[1] += ' UTC+0900'; // 11:00 UTC+0900
    }

    // handler for english time format: 10/05 at 11:00 p.m. (PDT) ~ 10/06 at 3:00 a.m. (PDT)
    if (string.nodeValue.indexOf(') ~ ') !== -1) {

      // requires /\s+/ because:
      // - p.m.: ["10/05","at","11:00","p.m.","(PDT)"]
      // - a.m.: ["10/06","at","","3:00","a.m.","(PDT)"]
      start = start.split(/\s+/);
      start[0] += '/' + year; // 10/05/2015

      if (start[3] === 'p.m.') {
        var starttime = start[2].split(':');
        var starthour = parseInt(starttime[0],10);

        starthour += 12;
        starttime[0] = starthour;

        start[2] = starttime.join(':');
      }

      if (start[4].indexOf('(') !== -1 && start[4].indexOf(')') !== -1) {
        start[4] // (PDT)
          .replace('(','') // PDT)
            .replace(')',''); // PDT
      }

      start.splice(3,1); // remove a.m./p.m.
      start.splice(1,1); // remove 'at'

    }

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
