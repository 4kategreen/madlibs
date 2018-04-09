const fs = require('fs');
const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.constructor(): valid config object', assert => {
  const storyConfig = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}}.',
    title: 'My Trip to Disney'
  };

  const wordsConfig = [];

  const prompt = [
    {
      message: 'Enter a name:',
      name: 'name.name0',
      type: 'input',
      validate: () => false
    }
  ];

  const story = new Story(storyConfig, wordsConfig);

  assert.equal(story.id, storyConfig.id, 'story.id should be set correctly');
  assert.equal(story.title, storyConfig.title, 'story.title should be set correctly');
  assert.equal(story.template, storyConfig.template, 'story.template should be set correctly');

  assert.equal(story.prompt.length, prompt.length, 'story.prompt is the correct length');
  assert.equal(story.prompt[0].message, prompt[0].message, 'story.prompt.message should be set correctly');
  assert.equal(story.prompt[0].name, prompt[0].name, 'story.prompt.name should be set correctly');
  assert.equal(story.prompt[0].type, prompt[0].type, 'story.prompt.type should be set correctly');

  assert.end();
});

test('Story.constructor(): invalid config object', assert => {
  const storyConfig = {
    id: 'disney',
    title: 'My Trip to Disney'
  };

  const wordsConfig = [];

  const fn = () => new Story(storyConfig, wordsConfig);
  const regexp = new RegExp('template is a required argument');

  assert.throws(fn, regexp, 'should throw a meaningful error');
  assert.end();
});
