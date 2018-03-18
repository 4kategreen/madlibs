const fs = require('fs');
const inquirer = require('inquirer');
const config = require('./config');

const getStoryPrompt = () => {
  return [
    {
      choices: config.stories.map(story => {
        return {
          name: story.title,
          value: story.id
        };
      }),
      message: config.welcome,
      name: 'story',
      type: 'list'
    }
  ];
};

const getWordsPrompt = story => {
  const template = getStoryTemplate(story.template);
  const words = getWordsFromStoryTemplate(template);

  const prompt = words.map(word => {
    const conf = config.words.find(configWord => configWord.id === word);
    const message = conf ? conf.question : `Enter a ${word}:`;

    return {
      message,
      name: word,
      type: 'input'
    };
  });

  return prompt || [];
};

const getStoryTemplate = template => {
  return fs.readFileSync(`${__dirname}/stories/${template}`).toString();
};

const getWordsFromStoryTemplate = story => {
  /**
   * UNIT TEST NOTES: if `getWordsFromStory` was simply...
   *
   * return story.match(/{{[{]?(.*?)[}]?}}/g).map(word => word.replace(/({{)|(}})/g, ''));
   *
   * ... it would throw a `TypeError` if the story did not contain any variables. maybe
   * we use the line of code above to start with, and then our unit tests will help us
   * catch the bug and we refactor to the version below.
   *
   */

  const variables = story.match(/{{[{]?(.*?)[}]?}}/g);

  if (variables.length) {
    return variables.map(word => word.replace(/({{)|(}})/g, ''));
  }

  return [];
};

const compileStoryTemplate = ({ story, values }) => {
  // TODO: actually replace variables in template with values

  const template = getStoryTemplate(story.template);
  return template;
};

module.exports = () => {
  const initialPrompt = getStoryPrompt();
  let storyConfig;

  inquirer
    .prompt(initialPrompt)
    .then(response => {
      const storyId = response.story;
      storyConfig = config.stories.find(story => story.id === storyId);
      const wordsPrompt = getWordsPrompt(storyConfig);

      return inquirer.prompt(wordsPrompt);
    })
    .then(response => {
      const story = compileStoryTemplate({ story: storyConfig, values: response });
      console.log(story);
    })
    .catch(e => {
      console.log('Oops! An error occurred. Maybe we should have better unit tests.', e);
    });
};
