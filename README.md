# Squid Thing

- Chrome extension
- Must be logged into [Squid Ring](https://splatoon.nintendo.net/) for functionality
- Install via the [Chrome web store page](https://chrome.google.com/webstore/detail/squid-thing/acladlefcbpicihheonbnonmgdemeoco)
- Not affiliated with Nintendo

# Features

- Provides convenient access to Squid Ring stage rotation info via くコ:彡 button
- North American localization of stage names and ranked battle modes

# Screenshots

In other words, it adds this button:

![](https://i.imgur.com/MHH2MkZ.gif)

And turns:

![](https://i.imgur.com/4UwMpLC.gif)

Into:

![](https://i.imgur.com/M9TcEiY.gif)

# Is it safe to use? How does it work?

- This extension fetches the schedules page directly from Squid Ring as an iframe and applies content script overrides
- `localize.js` loops through the text on the schedules page and substitutes NA-localized text if applicable
- `styles.css` overrides the original style sheet in order to provide the UI for the pop-up button
- `notloggedin.js` simply alerts the user when they are not logged into Squid Ring
