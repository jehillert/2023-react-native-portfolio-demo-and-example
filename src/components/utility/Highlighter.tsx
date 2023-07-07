// source: https://github.com/clauderic/react-native-highlight-words
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { findAll, FindChunksArgs } from '../../utils';

Highlighter.propTypes = {};

interface Props {
  autoEscape?: boolean;
  highlightStyle?: StyleProp<TextStyle>;
  searchWords: string[];
  textToHighlight: string;
  sanitize?: FindChunksArgs['sanitize'];
  style?: StyleProp<TextStyle>;
  otherTextProps?: TextProps;
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <Text> elements (wrapping highlighted words).
 */
export default function Highlighter({
  autoEscape,
  highlightStyle,
  searchWords,
  textToHighlight,
  sanitize,
  style,
  otherTextProps,
}: Props) {
  const chunks = findAll({
    textToHighlight,
    searchWords,
    sanitize,
    autoEscape,
  });

  return (
    <Text style={style} {...otherTextProps}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(
          chunk.start,
          chunk.end - chunk.start,
        );

        return !chunk.highlight ? (
          text
        ) : (
          <Text key={index} style={chunk.highlight && highlightStyle}>
            {text}
          </Text>
        );
      })}
    </Text>
  );
}
