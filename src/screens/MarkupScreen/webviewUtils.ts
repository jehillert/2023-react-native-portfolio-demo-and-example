import { CSSProperties } from 'react';

type SearchConfig = {
  wholeWordOnly: boolean;
  caseSensitive: boolean;
};

type MarkupGloballyProps = {
  styles: CSSProperties;
  searchConfig?: SearchConfig;
};

const defaultSearchConfig: SearchConfig = {
  wholeWordOnly: false,
  caseSensitive: false,
};

const markupGlobally = (
  styles: CSSProperties,
  searchConfig = defaultSearchConfig,
) => /*javascript*/ `
  ((styles = ${JSON.stringify(styles)}) => {

    const getMarkupId = (searchText) =>
      Object.keys(styles)
        .sort()
        .reduce((accum, keyName) => {
          return accum + '-' + keyName;
        }, [searchText]);

  const getMarkupNode = (markupId) => {
    spanNode = document.createElement('SPAN');
    spanNode.setAttribute('class', markupId);
    for (property in styles) {
      spanNode.style[property] = styles[property];
    }
    return spanNode;
  };

    let count = 0;
    let selectedText = document.getSelection().toString();
window.ReactNativeWebView.postMessage(JSON.stringify(selectedText));
    if (!selectedText) return;

    const markupId = getMarkupId(styles, selectedText);
    const markupNode = getMarkupNode(markupId, styles);

    const searchWithinNode = (node, searchText) => {
      let skip = 0;
      const { childNodes, nodeType, tagName } = node;
      const isTextNode = nodeType === Node.TEXT_NODE;
      const hasSearchableChildren =
        nodeType === Node.ELEMENT_NODE &&
        childNodes &&
        tagName.toUpperCase() !== 'SCRIPT' &&
        tagName.toUpperCase() !== 'STYLE';

      if (isTextNode) {
        const pos = node.data.toUpperCase().indexOf(searchText);
        if (pos >= 0) {
          const spanNode = markupNode.cloneNode(true);
          const middlebit = node.splitText(pos);
          const endbit = middlebit.splitText(searchText.length);
          const middleclone = middlebit.cloneNode(true);
          spanNode.appendChild(middleclone);
          middlebit.parentNode.replaceChild(spanNode, middlebit);
          ++count;
          skip = 1;
        }
      } else if (hasSearchableChildren) {
        for (let child = 0; child < node.childNodes.length; ++child) {
          child = child + searchWithinNode(node.childNodes[child], searchText);
        }
      }
      return skip;
    };

    searchWithinNode(document.body, selectedText.toUpperCase());

    const markupResult = {
       count,
       markupId
     };

    window.ReactNativeWebView.postMessage(JSON.stringify(markupResult));
  })();
`;

const listener = /*javascript*/ `
  const messageEventListenerFn = (e) => {
    window.ReactNativeWebView.postMessage("I worked the first time");

    ${markupGlobally}

    let result = { isError: false };

    try {
      if (e.origin === '' && typeof window.ReactNativeWebView === 'object') {
        const { target, action, args} = JSON.parse(e.data);

        switch (action) {
          case 'markupGlobally':
            result.operation = markupGlobally(args);
            break;
          case 'clearSelection':
            // window.getSelection()?.removeAllRanges()
            break;
          default:
            break;
        }
      }
    } catch (error) {
      result.errorMsg = error.message;
      result.isError = true;
    } finally {
      window.ReactNativeWebView.postMessage(JSON.stringify(result));
    }
  };
  window.addEventListener('message', (e) => messageEventListenerFn(e));
  document.addEventListener('message', (e) => messageEventListenerFn(e));
`;

const initInject = (
  document: string,
  bodyStyle: string,
  listener: string,
) => `<!DOCTYPE html>\n
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body
      style="${bodyStyle}">
      ${document}
      <script>
        ${listener}
      </script>
    </body>
  </html>
`;

export { initInject, listener, markupGlobally };
