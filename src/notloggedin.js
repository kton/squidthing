if (top !== self) {
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
