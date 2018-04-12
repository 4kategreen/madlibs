class Story {
  /**
   * represents a story object
   * @constructor
   * @param {object} options - Story config from config/stories.json
   * @param {object} config - Words config from config/words.json
   */
  constructor(options = {}, config = {}) {
    const { id, template, title } = options;

    if (!template) {
      throw new Error('template is a required argument');
    }

    this.id = id;
    this.title = title;
    this.template = template;
    this.prompt = this.getPrompt(this.template, config);
  }

  /**
   * takes the outcome of the CLI interaction and returns a string representing the final
   * story, with the user-supplied values injected in place of the template variables
   * @param {object} words - An object that represents the responses from the CLI
   * ex. { "0": "walk", "1": "banana", "2": "orange" }
   */
  compile(words = {}) {
    const variables = this.getVariablesFromTemplate(this.template);
    const variableCount = variables.length;
    const wordCount = Object.keys(words).length;

    if (variableCount !== wordCount) {
      throw new Error(`Wrong number of values provided. Expecting ${variableCount}. Got ${wordCount}.`);
    }

    let compiled = this.template;

    variables.forEach((variable, i) => {
      const key = Object.keys(words)[i];
      const word = words[key];
      compiled = compiled.replace(`{{${variable}}}`, word);
    });

    return compiled;
  }

  /**
   * getVariablesFromTemplate() uses regexes to pull out all variables enclosed in handlebars (ex. {{verb}})
   * from the story template, and returns an array of variables (ex. ["verb", "adjective"])
   * @param {string} template - A story template, possibly containing handlebars variables
   */
  getVariablesFromTemplate(template) {
    const variables = template.match(/{{[{]?(.*?)[}]?}}/g) || []; //match everything that looks like: {{foo}}
    const trimmedVariables = [];
    variables.forEach(variable => {
      trimmedVariables.push(variable.replace(/({{)|(}})/g, '')); //get rid of the curly braces
    });

    return trimmedVariables;
  }

  /**
   * getPrompt() returns an array of objects representing CLI prompts
   * @param {string} template - A story template, possibly containing handlebars variables
   * @param {object} config - Words config from config/words.json
   */
  getPrompt(template, config) {
    const variables = this.getVariablesFromTemplate(template);
    const prompts = [];

    variables.forEach((variable, index) => {
      let prompt = {
        message: `Enter a ${variable}:`,
        name: index.toString(),
        type: 'input',
        validate: input => (input ? true : 'You must answer before continuing')
      };

      const wordConfig = config[variable];
      if (wordConfig) {
        prompt = Object.assign(prompt, wordConfig);
      }

      prompts.push(prompt);
    });

    return prompts;
  }
}

module.exports = Story;