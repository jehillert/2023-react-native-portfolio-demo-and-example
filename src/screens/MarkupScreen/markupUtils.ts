import { CSSProperties } from 'react';
import { defaultSearchConfig } from './markupConstants';
import { MarkupTag, SearchConfig } from './markupTypes';
import { uuid } from '../../utils';

type MarkupGlobally = {
  tag: MarkupTag;
  styles: CSSProperties;
  searchConfig?: SearchConfig;
};

const markupGlobally = ({
  tag,
  styles,
  searchConfig = defaultSearchConfig,
}: MarkupGlobally) => {
  const id = uuid();
  const markupId = `${tag}-${id}`;

  return /*javascript*/ `
    ((
      id = ${JSON.stringify(id)},
      markupId = ${JSON.stringify(markupId)},
      styles = ${JSON.stringify(styles)},
      searchConfig = ${JSON.stringify(searchConfig)},
      tag = ${JSON.stringify(tag)}
    ) => {
    const getMarkupNode = (markupId) => {
      spanNode = document.createElement('SPAN');
      spanNode.setAttribute('class', markupId);
      for (property in styles) {
        spanNode.style[property] = styles[property];
      }
      return spanNode;
    };

    let selectedText = document.getSelection().toString();

    if (!selectedText) return;

    const markupNode = getMarkupNode(markupId);

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
      id,
      searchConfig,
      searchText: selectedText,
      styles,
      tag,
    };

    window.ReactNativeWebView.postMessage(JSON.stringify(markupResult));
  })();
`;
};

const initInject = (document: string, bodyStyle: string) => `<!DOCTYPE html>\n
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body
      style="${bodyStyle}">
      ${document}
      <script>
      </script>
    </body>
  </html>
`;

export { initInject, markupGlobally };
