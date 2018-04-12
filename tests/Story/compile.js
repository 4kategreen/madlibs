const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.compile()', assert => {
  const story = new Story({ template: 'hello' });

  const actual = typeof story.compile;
  const expected = 'function';

  assert.equal(actual, expected, '.compile() is a function');

  assert.end();
});

test('Story.compile(): story with no variables', assert => {
  const options = {
    id: 'disney',
    template: 'Last month, I went to Disney World with Kate.',
    title: 'My Trip to Disney'
  };

  const story = new Story(options);
  const actual = story.compile();
  const expected = 'Last month, I went to Disney World with Kate.';

  assert.equal(actual, expected, '.compile() with no inputs returns the correct value');

  const fn = () => story.compile({ '0': 'magical' });
  const regex = new RegExp('Wrong number of values provided. Expecting 0. Got 1.');

  assert.throws(fn, regex, '.compile() with no template variables and a user input should throw a meaningful error');

  assert.end();
});

test('Story.compile(): story with one variable', assert => {
  const options = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}}.',
    title: 'My Trip to Disney'
  };

  const story = new Story(options);

  const actual = story.compile({ '0': 'Kate' });
  const expected = 'Last month, I went to Disney World with Kate.';

  assert.equal(actual, expected, '.compile() with one input returns the correct value');

  const fn = () => story.compile();
  const regex = new RegExp('Wrong number of values provided. Expecting 1. Got 0.');

  assert.throws(fn, regex, '.compile() with one template variable and no user inputs should throw a meaningful error');

  assert.end();
});

test('Story.compile(): story with more than one variable', assert => {
  const options = {
    id: 'disney',
    template: 'Last month, I went to {{place}} with {{name}} and {{name}}.',
    title: 'My Trip to Disney'
  };

  const story = new Story(options);

  const actual = story.compile({ '0': 'a circus', '1': 'Kate', '2': 'Leslie' });
  const expected = 'Last month, I went to a circus with Kate and Leslie.';

  assert.equal(actual, expected, '.compile() with more than one input returns the correct value');

  const fn = () => story.compile({ '0': 'a circus', '1': 'Kate' });
  const regex = new RegExp('Wrong number of values provided. Expecting 3. Got 2.');

  assert.throws(
    fn,
    regex,
    '.compile() with more than one template variable and the wrong number of user inputs should throw a meaningful error'
  );

  assert.end();
});
