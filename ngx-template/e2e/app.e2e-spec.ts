import { NgxTemplatePage } from './app.po';

describe('ngx-template App', () => {
  let page: NgxTemplatePage;

  beforeEach(() => {
    page = new NgxTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
