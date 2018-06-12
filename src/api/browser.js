// Opera 8.0+
let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
let isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
let isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
let isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
let isChrome = !!window.chrome || !!navigator.userAgent.match('CriOS'); //chrome ios has CriOS

let isGoogleBot = !!(/Googlebot/.test(navigator.userAgent));

// Blink engine detection
let isBlink = (isChrome || isOpera) && !!window.CSS;

//Facebook browser
let ua = navigator.userAgent || navigator.vendor || window.opera;
let fbBrowser =  (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);

//Instagram Browser
let instagram = (ua.toLowerCase().indexOf("instagram") > -1);

//UC Browser
let UCBrowser = (ua.indexOf('UCBrowser') > -1);

const browserSupport = () =>{
  let supported = isChrome || isGoogleBot || fbBrowser || instagram;
  let unSupported = isIE || UCBrowser;
  window.logCT({
    eventAction:'Browser Support',
    supported:!unSupported
  })
  if(globals.env == 'debug')
    return true;
  return !unSupported;
}

const bookmarkPage = () =>{
  if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
    window.sidebar.addPanel(document.title, window.location.href, '');
  } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
    window.external.AddFavorite(location.href, document.title);
  } else if (window.opera && window.print) { // Opera Hotlist
    this.title = document.title;
    return true;
  } else { // webkit - safari/chrome
    alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
  }
}

export {browserSupport,bookmarkPage};