const test = require('tape');
const Story = require('./../../lib/Story');

test('Story.getPrompt()', assert => {
  const story = new Story({ template: 'hello' });

  const actual = typeof story.getPrompt;
  const expected = 'function';

  assert.equal(actual, expected, '.getPrompt() is a function');

  assert.end();
});

test('Story.getPrompt() generates correct prompts with no config', assert => {
  const options = { template: 'hello {{name}}' };

  const story = new Story(options);
  const prompts = story.getPrompt(options.template, {});
  assert.equal(prompts.length, 1, '.getPrompt() contains one prompt');
  assert.equal(prompts[0].message, 'Enter a name:', '.getPrompt().message is set with the default value');
  assert.equal(prompts[0].name, '0', '.getPrompt().name is set with the default value');
  assert.equal(prompts[0].type, 'input', '.getPrompt().input is set with the default value');
  assert.equal(typeof prompts[0].validate, 'function', '.getPrompt().validate is set with the default value');
  assert.end();
});

test('Story.getPrompt() generates correct prompts with custom config', assert => {
  const options = { template: 'hello {{name}}' };
  const config = {
    name: {
      message: 'Enter a super cool, very groovy name:',
      type: 'list',
      choices: ['foo', 'bar']
    }
  };

  const story = new Story(options, config);
  const prompts = story.getPrompt(options.template, config);

  assert.equal(prompts.length, 1, '.getPrompt() contains one prompt');
  assert.equal(prompts[0].name, '0', '.getPrompt().name is set with the default value');
  assert.equal(
    prompts[0].message,
    'Enter a super cool, very groovy name:',
    '.getPrompt().message is set with the custom value'
  );
  assert.equal(prompts[0].type, 'list', '.getPrompt().input is set with the custom value');
  assert.ok(Array.isArray(prompts[0].choices), '.getPrompt().choices is set with the custom value');
  assert.equal(prompts[0].type, 'list', '.getPrompt().input is set with the custom value');
  assert.equal(typeof prompts[0].validate, 'function', '.getPrompt().validate is set with the default value');
  assert.end();
});
