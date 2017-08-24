import { DemoFrontPage } from './app.po';

describe('demo-front App', function() {
  let page: DemoFrontPage;

  beforeEach(() => {
    page = new DemoFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
