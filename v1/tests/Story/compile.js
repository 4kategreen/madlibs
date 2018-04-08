const fs = require('fs');
const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.compile(): no input', assert => {
  const storyConfig = {
    id: 'disney',
    template: 'Last month, I went to Disney World with Kate.',
    title: 'My Trip to Disney'
  };

  const story = new Story(storyConfig);
  const actual = story.compile();
  const expected = 'Last month, I went to Disney World with Kate.';

  assert.equal(actual, expected, '.compile() with no inputs returns the correct value');

  assert.end();
});

test('Story.compile(): single input', assert => {
  const storyConfig = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}}.',
    title: 'My Trip to Disney'
  };

  const userResponse = {
    name: {
      name0: 'Kate'
    }
  }; 

  const story = new Story(storyConfig);
  const actual = story.compile(userResponse);
  const expected = 'Last month, I went to Disney World with Kate.';

  assert.equal(actual, expected, '.compile() with one input returns the correct value');

  assert.end();
});

test('Story.compile(): multiple inputs', assert => {
  const storyConfig = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}} and {{name}} to {{verb}}.',
    title: 'My Trip to Disney'
  };

  const userResponse = {
    name: {
      name0: 'Kate',
      name1: 'Leslie'
    },
    verb: {
      verb2: 'have fun'
    }
  }; 

  const story = new Story(storyConfig);
  const actual = story.compile(userResponse);
  const expected = 'Last month, I went to Disney World with Kate and Leslie to have fun.';

  assert.equal(actual, expected, '.compile() with multiple inputs returns the correct value');

  assert.end();
});

test('Story.compile(): wrong number of inputs', assert => {
  const storyConfig = {
    id: 'disney',
    template: 'Last month, I went to Disney World with {{name}} and {{name}} to {{verb}}.',
    title: 'My Trip to Disney'
  };

  const userResponse = {
    name: {
      name0: 'Kate',
      name1: 'Leslie'
    }
  }; 

  const story = new Story(storyConfig);
  const fn = () => story.compile(userResponse);
  const regexp = new RegExp('Wrong number of values provided. Expecting 3. Got 2');

  assert.throws(fn, regexp, 'should throw a meaningful error');

  assert.end();
});