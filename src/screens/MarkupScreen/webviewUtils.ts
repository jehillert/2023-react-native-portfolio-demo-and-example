const globalHighlight = `
const globalHighlight = (bg, fg = undefined) => {
  let count = 0;
  let selectedText;

  selectedText = document.getSelection().toString();

  if (!selectedText) return;

  const searchWithinNode = (node, searchText) => {
    let pos;
    let skip;
    let spanNode;
    let middlebit;
    let middleclone;

    skip = 0;

    const { childNodes, nodeType, tagName } = node;

    if (nodeType == Node.TEXT_NODE) {
      pos = node.data.toUpperCase().indexOf(searchText);
      if (pos >= 0) {
        spanNode = document.createElement('SPAN');
        spanNode.style.backgroundColor = bg;
        if (fg) {
          spanNode.style.color = fg;
        }
        middlebit = node.splitText(pos);
        endbit = middlebit.splitText(searchText.length);
        middleclone = middlebit.cloneNode(true);
        spanNode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spanNode, middlebit);
        ++count;
        skip = 1;
      }
    } else if (
      nodeType === Node.ELEMENT_NODE &&
      childNodes &&
      tagName.toUpperCase() !== 'SCRIPT' &&
      tagName.toUpperCase() !== 'STYLE'
    ) {
      for (let child = 0; child < node.childNodes.length; ++child) {
        child = child + searchWithinNode(node.childNodes[child], searchText);
      }
    }
    return skip;
  };
  searchWithinNode(document.body, selectedText.toUpperCase());

  return count;
};
`;

const listener = `
const messageEventListenerFn = (e) => {
  // window.ReactNativeWebView.postMessage('hi!');

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

const initInject = (document: string, bodyStyle: string) => `<!DOCTYPE html>\n
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
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
