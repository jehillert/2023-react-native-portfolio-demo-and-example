const globalHighlight = `const globalHighlight = (bg, fg = undefined) => {
  let count = 0;
  let TEXT;
  let dv;

  TEXT =
  '' +
  (window.getSelection
    ? window.getSelection()
    : document.getSelection
    ? document.getSelection()
    : document.selection.createRange().text);

    if (!TEXT) return;

    dv = document.defaultView;
    window.ReactNativeWebView.postMessage('INSIDE HIGHLIGHT FCN');

  function searchWithinNode(node, te, len) {
    var pos, skip, spannode, middlebit, endbit, middleclone;
    skip = 0;
    if (node.nodeType == 3) {
      pos = node.data.toUpperCase().indexOf(te);
      if (pos >= 0) {
        spannode = document.createElement('SPAN');
        spannode.style.backgroundColor = bg;
        if (fg) {
          spannode.style.color = fg;
        }
        middlebit = node.splitText(pos);
        endbit = middlebit.splitText(len);
        middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        ++count;
        skip = 1;
      }
    } else if (
      node.nodeType == 1 &&
      node.childNodes &&
      node.tagName.toUpperCase() != 'SCRIPT' &&
      node.tagName.toUpperCase != 'STYLE'
    ) {
      for (var child = 0; child < node.childNodes.length; ++child) {
        child = child + searchWithinNode(node.childNodes[child], te, len);
      }
    }
    return skip;
  }
  window.status = "Searching for '" + TEXT + "'...";
  searchWithinNode(document.body, TEXT.toUpperCase(), TEXT.length);
  window.status =
    'Found ' +
    count +
    ' occurrence' +
    (count == 1 ? '' : 's') +
    " of '" +
    TEXT +
    "'.";
}`;

const listener = `
const messageEventListenerFn = (e) => {
    ${globalHighlight}
    try {
      if (e.origin === '' && typeof window.ReactNativeWebView === 'object') {
        const { target, action, args} = JSON.parse(e.data);
        switch (action) {
          case 'globalHighlight':
            const { colors: { bg, fg = undefined }} = args;
            // window.ReactNativeWebView.postMessage(JSON.stringify(fg));
            globalHighlight(bg, fg)
            break;
          case 'clearSelection':
            window.getSelection()?.removeAllRanges()
            break;
          default:
            break;
        }
        if (parsedData?.actionType === 'clearSelection') {
          window.getSelection()?.removeAllRanges();
        }
      }
    } catch (e) {
      console.log('External: ', 'exception in eventListener: ', e.message);
    }
  };
  window.addEventListener('message', (e) => messageEventListenerFn(e));
  document.addEventListener('message', (e) => messageEventListenerFn(e));
`;

const initInject = (document: string, bodyStyle: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <script>
        ${listener}
      </script>
    </head>
    <body
      style="${bodyStyle}">
      ${document}
    </body>
  </html>
`;

export { initInject, listener };

/*

const highlightGlobally = (bg: string, fg?: string) => `
javascript: (function() {
  let count = 0;
  let TEXT;
  let dv;

  TEXT =
    '' +
    (window.getSelection
      ? window.getSelection()
      : document.getSelection
      ? document.getSelection()
      : document.selection.createRange().text);

  if (!TEXT) TEXT = prompt('Enter search phrase:', '');

  dv = document.defaultView;

  function searchWithinNode(node, te, len) {
    var pos, skip, spannode, middlebit, endbit, middleclone;
    skip = 0;
    if (node.nodeType == 3) {
      pos = node.data.toUpperCase().indexOf(te);
      if (pos >= 0) {
        spannode = document.createElement('SPAN');
        spannode.style.backgroundColor = '${bg}';
        ${fg ? `spannode.style.color = '${fg}';` : ''}
        middlebit = node.splitText(pos);
        endbit = middlebit.splitText(len);
        middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        ++count;
        skip = 1;
      }
    } else if (
      node.nodeType == 1 &&
      node.childNodes &&
      node.tagName.toUpperCase() != 'SCRIPT' &&
      node.tagName.toUpperCase != 'STYLE'
    ) {
      for (var child = 0; child < node.childNodes.length; ++child) {
        child = child + searchWithinNode(node.childNodes[child], te, len);
      }
    }
    return skip;
  }
  window.status = "Searching for '" + TEXT + "'...";
  searchWithinNode(document.body, TEXT.toUpperCase(), TEXT.length);
  window.status =
    'Found ' +
    count +
    ' occurrence' +
    (count == 1 ? '' : 's') +
    " of '" +
    TEXT +
    "'.";
})();
`;
*/
