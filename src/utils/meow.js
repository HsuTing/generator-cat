// @flow
'use strict';

import chalk from 'chalk';

/**
 * Count the length of string
 *
 * @param {string} message - Messagermation
 * @param {Array} labelArray - The array of labels
 * @return {string} - Output string
*/
const showMessage = (
  message: string,
  labelArray: Array<string>
): string => {
  if(labelArray.length !== 3)
    throw new Error('labelArray must be three elements.');

  const [startLabel, text, endLabel]: Array<string> = labelArray;
  const rawText: any = [text];
  rawText.raw = [text];

  return chalk`{white ${startLabel}${
    text === message ?
      chalk(rawText) :
      [].constructor
        .apply({}, new Array(message.replace(/(\{[a-zA-Z]* )|(\})/g, '').length))
        .map(() => text)
        .join('')
  }${endLabel}}`;
};

/**
 * String template
 *
 * @param {Array} messageArray - Array of String template
 * @return {string} - Output string
*/
export default (
  messageArray: Array<string> = ['Meoooooooooooooooooow!'],
  ...otherMessage: Array<string>
): string => {
  const message: string = ` ${messageArray.map((
    message: string,
    index: number
  ) => `${message}${otherMessage[index] || ''}`).join('')} `;

  return chalk`{yellowBright
    /\\__/\\     ${showMessage(message, ['╭', '─', '╮'])}
   /'    '\\    ${showMessage(message, ['│', ' ', '│'])}
 === 0  0 ===  ${showMessage(message, ['│', message, '│'])}
   \\  --  /    ${showMessage(message, ['│', ' ', '│'])}
  /        \\   ${showMessage(message, ['╰', '─', '╯'])}
 /          \\
|            |
 \\  ||  ||  /
  \\_oo__oo_/#######o
  }`;
};
