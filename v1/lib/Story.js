class Story {
  constructor(storyConfig, wordsConfig = []) {
    const { id, template, title } = storyConfig;

    if (!template) throw new Error('template is a required argument');

    this.id = id;
    this.title = title;
    this.template = template;
    this.prompt = this.getPrompt(this.template, wordsConfig);
  }

  compile(values = {}) {
    const words = this.getWordsFromTemplate(this.template);
    const wordCount = words.length;
    const valueCount = Object.keys(values).reduce((acc, key) => acc + Object.keys(values[key]).length, 0);

    if (wordCount !== valueCount) {
      throw new Error(`Wrong number of values provided. Expecting ${wordCount}. Got ${valueCount}`);
    }

    const compiled = words.reduce((compiled, word) => {
      // to randomize the order of the words, uncomment below
      // const index = Math.floor(Math.random() * Object.keys(values[word]).length);
      // const key = Object.keys(values[word])[index];

      const key = Object.keys(values[word])[0];
      const value = values[word][key];
      delete values[word][key];

      return compiled.replace(`{{${word}}}`, value);
    }, this.template);

    return compiled;
  }

  getWordsFromTemplate(template = '') {
    // match template variables that look like: {{verb}}
    const variables = template.match(/{{[{]?(.*?)[}]?}}/g) || [];
    return variables.map(word => word.replace(/({{)|(}})/g, ''));
  }

  getPrompt(template, wordsConfig) {
    const words = this.getWordsFromTemplate(template);

    if (!words.length) return [];

    return words.map((word, index) => {
      const wordConfig = wordsConfig.find(configWord => configWord.id === word) || {};

      return {
        message: wordConfig.question || `Enter a ${word}:`,
        name: `${word}.${word}${index}`,
        type: 'input',
        validate: inputs => (inputs ? true : 'You must answer before continuing')
      };
    });
  }
}

module.exports = Story;
