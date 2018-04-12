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
    message: config.app.start,
    name: 'storyId',
    type: 'list'
  }
];

module.exports = () => {
  inquirer
    .prompt(storyChoicePrompt)
    .then(({ storyId }) => {
      const options = config.stories.find(story => story.id === storyId);
      options.template = fs.readFileSync(`${__dirname}/stories/${options.file}`).toString();
      const story = new Story(options, config.words);

      return inquirer.prompt(story.prompt).then(values => {
        console.log(config.app.finish);
        console.log(story.compile(values));
      });
    })
    .catch(e => {
      console.log('Oops! An error occurred. Maybe we should have better unit tests.', e);
    });
};