const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.compile()', assert => {
  const story = new Story({ template: 'hello' });

  const actual = typeof story.compile;
  const expected = 'function';

  assert.equal(actual, expected, '.compile() is a function');
  
  assert.end();
});