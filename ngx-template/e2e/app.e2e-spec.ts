import { expect } from 'chai';
import { NgxTemplatePage } from './app.po';

describe('ngx-template App', () => {
  let page: NgxTemplatePage;

  beforeEach(() => {
    page = new NgxTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    return page.getParagraphText().then(text => expect(text).to.equal('app works!'));
  });
});
