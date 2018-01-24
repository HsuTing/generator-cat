// @flow
'use strict';

export const prompts: {
  name: string,
  description: string,
  keywords: Array<string>,
  author_name: string,
  author_email: string,
  author_url: string,
  type: 'none' | 'website' | 'desktop app' | 'mobile app',
  addons: Array<'npm' | 'heroku' | 'isPrivate'>
} = {
  name: 'test',
  description: 'description',
  keywords: ['keyword'],
  author_name: 'HsuTing',
  author_email: 'hsuting0106@gmail.com',
  author_url: 'http://hsuting.com',
  type: 'none',
  addons: []
};
