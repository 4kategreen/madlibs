const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.getVariablesFromTemplate()', assert => {
  const story = new Story({ template: 'hello' });

  const actual = typeof story.getVariablesFromTemplate;
  const expected = 'function';

  assert.equal(actual, expected, '.getVariablesFromTemplate() is a function');
  
  assert.end();
});