const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.constructor(): valid config object', assert => {
  const options = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}}.',
    title: 'My Trip to Disney'
  };

  const story = new Story(options);

  assert.equal(story.id, options.id, 'story.id should be set correctly');
  assert.equal(story.title, options.title, 'story.title should be set correctly');
  assert.equal(story.template, options.template, 'story.template should be set correctly');

  assert.end();
});


test('Story.constructor(): invalid config object', assert => {
  const options = {
    id: 'disney',
    title: 'My Trip to Disney'
  };

  const fn = () => new Story(options);
  const regex = new RegExp('template is a required argument');

  assert.throws(fn, regex, 'should throw a meaningful error');

  assert.end();
});