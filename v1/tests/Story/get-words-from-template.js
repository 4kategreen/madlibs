const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.getWordsFromTemplate()', assert => {
  const storyConfig = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}} and {{name}} to {{verb}}.',
    title: 'My Trip to Disney'
  };

  const story = new Story(storyConfig, []);

  assert.equal(story.id, storyConfig.id, 'story.id should be set correctly');
  assert.equal(story.title, storyConfig.title, 'story.title should be set correctly');
  assert.equal(story.template, storyConfig.template, 'story.template should be set correctly');

  assert.end();
});