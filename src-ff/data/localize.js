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
    'CampTriggerfish': 'Campamento Arowana',
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