import { ProjectOnePage } from './app.po';

describe('project-one App', function() {
  let page: ProjectOnePage;

  beforeEach(() => {
    page = new ProjectOnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
