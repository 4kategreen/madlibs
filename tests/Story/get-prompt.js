const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.getPrompt()', assert => {
  const story = new Story({ template: 'hello' });

  const actual = typeof story.getPrompt;
  const expected = 'function';

  assert.equal(actual, expected, '.getPrompt() is a function');
  
  assert.end();
});
