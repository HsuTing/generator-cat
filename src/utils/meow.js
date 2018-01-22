// @flow
'use strict';

import chalk from 'chalk';

const showInfo = (
  info: string,
  labelArray: Array<string>
):string => {
  if(labelArray.length !== 3)
    throw new Error('labelArray must be three elements.');

  const [startLabel, text, endLabel]: Array<string> = labelArray;
  const rawText: any = [text];
  rawText.raw = [text];

  return chalk`{white ${startLabel}${
    text === info ?
      chalk(rawText) :
      [].constructor
        .apply({}, new Array(info.replace(/(\{[a-zA-Z]* )|(\})/g, '').length))
        .map(() => text)
        .join('')
  }${endLabel}}`;
};

export default (
  infoArray: Array<string> = ['Meoooooooooooooooooow!'],
  ...otherInfo: Array<string>
): string => {
  const info: string = ` ${infoArray.map((
    info: string,
    index: number
  ) => `${info}${otherInfo[index] || ''}`).join('')} `;

  return chalk`{yellowBright
    /\\__/\\     ${showInfo(info, ['╭', '─', '╮'])}
   /'    '\\    ${showInfo(info, ['│', ' ', '│'])}
 === 0  0 ===  ${showInfo(info, ['│', info, '│'])}
   \\  --  /    ${showInfo(info, ['│', ' ', '│'])}
  /        \\   ${showInfo(info, ['╰', '─', '╯'])}
 /          \\
|            |
 \\  ||  ||  /
  \\_oo__oo_/#######o
  }`;
};
