// don't enter login credentials in an add-on
if (window.location.href === 'https://splatoon.nintendo.net/sign_in') {
  window.location = 'data:text/html;charset=utf-8,' +
    encodeURIComponent(
      '<!doctype html>' +
      '<html lang="en">' +
      '<head></head>' +
      '<body style="font-family:sans-serif;color:#fff;background:#696969;padding:10px 20px">' +
      '<h1>Hang on, squiddo!</h1>' +
      '<h2>You need to be signed into Squid Ring</h2>' +
      '<span>Log in at splatoon.nintendo.net and try again</span>' +
      '</body>' +
      '</html>'
    );
}

// https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/l10n#Using_Localized_Strings_in_JavaScript
// - Note that because you can't require() modules in content scripts, you
// - can't yet reference localized strings from content scripts.
var localizations = {
  'de': {
    'SplatZones': 'Herrschaft',
    'TowerControl': 'Turm-Kommando',
    'Rainmaker': 'Operation Goldfisch',
    'ArowanaMall': 'Arowana-Center',
    'BlackbellySkatepark': 'Punkasius-Skatepark',
    'BluefinDepot': 'Blauflossen-Depot',
    'CampTriggerfish': 'Camp Schützenfisch',
    'FlounderHeights': 'Schollensiedlung',
    'HammerheadBridge': 'Makrelenbrücke',
    'KelpDome': 'Tümmlerkuppel',
    'MorayTowers': 'Muränentürme',
    'PortMackerel': 'Heilbutt-Hafen',
    'SaltsprayRig': 'Bohrinsel Nautilus',
    'UrchinUnderpass': 'Dekabahnstation',
    'WalleyeWarehouse': 'Kofferfisch-Lager'
  },
  'en': {
    'SplatZones': 'Splat Zones',
    'TowerControl': 'Tower Control',
    'Rainmaker': 'Rainmaker',
    'ArowanaMall': 'Arowana Mall',
    'BlackbellySkatepark': 'Blackbelly Skatepark',
    'BluefinDepot': 'Bluefin Depot',
    'CampTriggerfish': 'Camp Triggerfish',
    'FlounderHeights': 'Flounder Heights',
    'HammerheadBridge': 'Hammerhead Bridge',
    'KelpDome': 'Kelp Dome',
    'MorayTowers': 'Moray Towers',
    'PortMackerel': 'Port Mackerel',
    'SaltsprayRig': 'Saltspray Rig',
    'UrchinUnderpass': 'Urchin Underpass',
    'WalleyeWarehouse': 'Walleye Warehouse'
  },
  'es': {
    'SplatZones': 'Pintazonas',
    'TowerControl': 'Torreón',
    'Rainmaker': 'Pez dorado',
    'ArowanaMall': 'Plazuela del Calamar',
    'BlackbellySkatepark': 'Parque Lubina',
    'BluefinDepot': 'Mina costera',
    'CampTriggerfish': 'Campamento Arowana',
    'FlounderHeights': 'Complejo Medusa',
    'HammerheadBridge': 'Puente Salmón',
    'KelpDome': 'Jardín botánico',
    'MorayTowers': 'Torres Merluza',
    'PortMackerel': 'Puerto Jurel',
    'SaltsprayRig': 'Plataforma Gaviota',
    'UrchinUnderpass': 'Parque Viaducto',
    'WalleyeWarehouse': 'Almacén Rodaballo'
  },
  'fr': {
    'SplatZones': 'Défense de Zone',
    'TowerControl': 'Expédition Risquée',
    'Rainmaker': 'Mission Bazookarpe',
    'ArowanaMall': 'Centre Arowana',
    'BlackbellySkatepark': 'Skatepark Mako',
    'BluefinDepot': 'Mine Marine',
    'CampTriggerfish': 'Hippo-Camping',
    'FlounderHeights': 'Lotissement Filament',
    'HammerheadBridge': 'Pont Esturgeon',
    'KelpDome': 'Serre Goémon',
    'MorayTowers': 'Tours Girelle',
    'PortMackerel': 'Docks Haddock',
    'SaltsprayRig': 'Station Doucebrise',
    'UrchinUnderpass': 'Passage Turbot',
    'WalleyeWarehouse': 'Encrepôt'
  },
  'it': {
    'SplatZones': 'Zone Splat',
    'TowerControl': 'Torre Mobile',
    'Rainmaker': 'Bazookarp',
    'ArowanaMall': 'Centro Commerciale',
    'BlackbellySkatepark': 'Pista Polposkate',
    'BluefinDepot': 'Molo Mollusco',
    'CampTriggerfish': 'Campeggio Totan',
    'FlounderHeights': 'Cime Sogliolose',
    'HammerheadBridge': 'Ponte Sgombro',
    'KelpDome': 'Serra di alghe',
    'MorayTowers': 'Torri cittadine',
    'PortMackerel': 'Porto Polpo',
    'SaltsprayRig': 'Raffineria',
    'UrchinUnderpass': 'Periferia urbana',
    'WalleyeWarehouse': 'Magazzino'
  }
};

var supported = ['de', 'en', 'es', 'fr', 'it'];
var language = window.navigator.language;

// en-US -> en
if (language.length > 2) {
  language = language.slice(0,2);
}

// unsupported locale -> default to english
if (supported.indexOf(language) === -1) {
  language = 'en';
}

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
  'タチウオパーキング': 'MorayTowers',
  'ホッケふ頭': 'PortMackerel',
  'シオノメ油田': 'SaltsprayRig',
  'デカライン高架下': 'UrchinUnderpass',
  'ハコフグ倉庫': 'WalleyeWarehouse'
};

for (var entry in dictionary) {
  dictionary[entry] = localizations[language][dictionary[entry]];
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
  // japanese -> english
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

      if (start[3] === 'p.m') {
        var starttime = start[2].split(':');
        var starthour = parseInt(starttime[0],10);

        starthour += 12;
        starttime[0] = starthour;

        start[3] = starttime.join(':');
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
