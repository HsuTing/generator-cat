'use strict';

import author from './author';
import favicon from './favicon';

import checkContent from './../../utils/checkTemplate';

export default ({
  graphql,
  chooseType
}) => {
  it('views/template.html', () => {
    author(checkContent);
    favicon(checkContent);

    checkContent(true, '{% set title=\'test\' -%}');
    checkContent(true, '{% set description=\'desc\' -%}');
    checkContent(true, '{% set subject=\'subject\' -%}');
    checkContent(true, '{% set url=\'http://hsuting.com\' -%}');

    checkContent(graphql, 'var records = {{ records | safe }};');

    switch(chooseType) {
      case 'docs':
        checkContent(
          true,
          '<script defer src="/test/public/js/common.min.js" type="text/javascript"></script>'
        );
        checkContent(
          true,
          '<script defer src="/test/public/js/{{ js }}.min.js" type="text/javascript"></script>'
        );
        break;

      case 'desktop app':
        checkContent(
          true,
          '<script defer src="./public/js/common.min.js" type="text/javascript"></script>'
        );
        checkContent(
          true,
          '<script defer src="./public/js/{{ js }}.min.js" type="text/javascript"></script>'
        );
        break;

      default:
        checkContent(
          true,
          '<script defer src="/public/js/common.min.js" type="text/javascript"></script>'
        );
        checkContent(
          true,
          '<script defer src="/public/js/{{ js }}.min.js" type="text/javascript"></script>'
        );
        break;
    }
  });
};
