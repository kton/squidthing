# Squid Thing

- Must be logged into [Squid Ring](https://splatoon.nintendo.net/) for functionality
- Chrome extension
  - Install via the [Chrome web store page](https://chrome.google.com/webstore/detail/squid-thing/acladlefcbpicihheonbnonmgdemeoco)
- Firefox extension
  - Install via the [Firefox add-ons page](https://addons.mozilla.org/en-US/firefox/addon/squid-thing/)
- Not affiliated with Nintendo

# Features

- Provides convenient access to Squid Ring stage rotation info via くコ:彡 button
- Localization of Splatoon stage names and ranked battle modes
  - English (NOA)
  - German
  - Spanish
  - French (NOE)
  - Italian
- Displays region-specific Splatfest information, based on your NNID

# Screenshots

In other words, it adds this button:

![](https://i.imgur.com/MHH2MkZ.gif)

And handles Splatfest display for your region:

![](https://i.imgur.com/08HUkiT.gif)

And turns:

![](https://i.imgur.com/4UwMpLC.gif)

Into:

![](https://i.imgur.com/M9TcEiY.gif)

# Limitations

- ~~[Stage rotation information](http://www.nintendo.co.jp/wiiu/agmj/stage/index.html) will be unavailable during Japan's Splatfests~~
  - As of the ボケ vs ツッコミ (2015/9/12 12:00 ～ 9/13 12:00) JP Splatfest, this is no longer true
     - Non-JP Splatfest information is now fully supported!
  - Squid Ring stage rotation information now appears to be personalized based on NNID
     - North America NNID displays NA stage rotation during JP Splatfest, rather than the notice pictured below


![](https://i.imgur.com/A03GVFK.gif)

# Is it safe to use? How does it work?

- This extension fetches the schedules page directly from Squid Ring as an iframe and applies content script overrides
- `localize.js` loops through the text on the schedules page and substitutes localized text if applicable
- `styles.css` overrides the original style sheet in order to provide the UI for the pop-up button
- `notloggedin.js` simply alerts the user when they are not logged into Squid Ring

# Credits

- [Inkipedia](http://splatoonwiki.org/wiki/Main_Page) for stage/mode localization
- Reddit user [PommePatate](https://www.reddit.com/r/SplatoonMeta/comments/3hakjy/i_made_a_chrome_extension_that_displays_current/cu5suad), for additional French localization
