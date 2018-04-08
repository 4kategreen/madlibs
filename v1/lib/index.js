const inquirer = require('inquirer');
const fs = require('fs');
const config = require('./config');
const Story = require('./Story');

const storyChoicePrompt = [
  {
    choices: config.stories.map(story => {
      return {
        name: story.title,
        value: story.id
      };
    }),
    message: config.welcome,
    name: 'storyId',
    type: 'list'
  }
];

module.exports = () => {
  let story;

  inquirer
    .prompt(storyChoicePrompt)
    .then(({ storyId }) => {
      const storyConfig = config.stories.find(story => story.id === storyId);
      storyConfig.template = fs.readFileSync(`${__dirname}/stories/${storyConfig.file}`).toString();
      story = new Story(storyConfig, config.words);
      return inquirer.prompt(story.prompt);
    })
    .then(values => {
      const output = story.compile(values);
      console.log(output)
    })
    .catch(e => {
      console.log('Oops! An error occurred. Maybe we should have better unit tests.', e);
    });
};
