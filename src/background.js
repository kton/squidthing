// used to work around Content Security Policy (CSP), an anti-XSS measure
// this is _required_ to embed the stage rotations in an iframe due to the way
// Chrome popups are structured and the 'X-Frame-Options' ->'SAMEORIGIN' header
chrome.webRequest.onHeadersReceived.addListener(
  function(data) {
    var headers = data.responseHeaders;
    for (var i = headers.length - 1; i >= 0; --i) {
      var header = headers[i].name.toLowerCase();
      if (header === 'x-frame-options' || header === 'frame-options') {
        headers.splice(i, 1); // remove header
      }
    }

    return {responseHeaders: headers};
  },

  {
    urls: ['https://splatoon.nintendo.net/*'],
    types: ['sub_frame']
  },

  ['blocking', 'responseHeaders']
);
