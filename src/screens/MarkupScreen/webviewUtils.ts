/**
 * Escape template literal nested inside template literal.
 * @example
 * const myExample = `Some words \`\${myExpression}\` some more words`;
 */
const getMarkupId = /*javascript*/ `
  const getMarkupId = (styles, searchText) =>
    Object.keys(styles)
      .sort()
      .reduce((accum, keyName) => {
        return accum + '-' + keyName;
      }, \`[\${searchText}]\`);
`;

const getMarkupNode = /*javascript*/ `
  const getMarkupNode = (markupId, styles) => {
    spanNode = document.createElement('SPAN');
    spanNode.setAttribute('class', markupId);
    for (property in styles) {
      spanNode.style[property] = styles[property];
    }
    return spanNode;
  };
`;

const globalHighlight = /*javascript*/ `
  ${getMarkupNode}
  ${getMarkupId}

  const globalHighlight = ({ styles, searchConfig }) => {
    let count = 0;
    let selectedText = document.getSelection().toString();

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
          // const spanNode = getMarkupNode(markupId, styles);
          const spanNode = markupNode.cloneNode(true);
          const middlebit = node.splitText(pos);
          endbit = middlebit.splitText(searchText.length);
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

    return {
      count,
      markupId
    };
  };
`;

const listener = /*javascript*/ `
const messageEventListenerFn = (e) => {
    ${globalHighlight}

    let result = { isError: false };

    try {
      if (e.origin === '' && typeof window.ReactNativeWebView === 'object') {
        const { target, action, args} = JSON.parse(e.data);

        switch (action) {
          case 'globalHighlight':
            result.operation = globalHighlight(args);
            break;
          case 'clearSelection':
            window.getSelection()?.removeAllRanges()
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
