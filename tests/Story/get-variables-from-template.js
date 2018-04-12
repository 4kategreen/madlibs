const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.getVariablesFromTemplate()', assert => {
  const story = new Story({ template: 'hello' });
  const actual = typeof story.getVariablesFromTemplate;
  const expected = 'function';

  assert.equal(actual, expected, '.getVariablesFromTemplate() is a function');

  assert.end();
});

test('Story.getVariablesFromTemplate(): template with no variables', assert => {
  const story = new Story({ template: 'hello' });
  const variables = story.getVariablesFromTemplate(story.template);

  assert.ok(Array.isArray(variables), '.getVariablesFromTemplate() returns an array');
  assert.equal(variables.length, 0, '.getVariablesFromTemplate() returns an empty array');

  assert.end();
});

test('Story.getVariablesFromTemplate(): template with one variable', assert => {
  const story = new Story({ template: 'hello {{name}}' });
  const variables = story.getVariablesFromTemplate(story.template);

  assert.ok(Array.isArray(variables), '.getVariablesFromTemplate() returns an array');
  assert.equal(variables.length, 1, '.getVariablesFromTemplate() returns an array with one variable');
  assert.equal(variables[0], 'name', '.getVariablesFromTemplate() returns an array with the expected variable');

  assert.end();
});

test('Story.getVariablesFromTemplate(): template with more than one variable', assert => {
  const story = new Story({ template: 'hello {{name}}, {{name}}, and {{animal}}' });
  const variables = story.getVariablesFromTemplate(story.template);

  assert.ok(Array.isArray(variables), '.getVariablesFromTemplate() returns an array');
  assert.equal(
    variables.length,
    3,
    '.getVariablesFromTemplate() returns an array with the correct number of variables'
  );
  assert.equal(variables[0], 'name', '.getVariablesFromTemplate() returns an array with the expected variable');
  assert.equal(variables[1], 'name', '.getVariablesFromTemplate() returns an array with the expected variable');
  assert.equal(variables[2], 'animal', '.getVariablesFromTemplate() returns an array with the expected variable');

  assert.end();
});
