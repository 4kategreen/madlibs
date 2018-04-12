# Requirements
The madlibs app will use a series of user prompts to generate a silly story. This story will be printed out and, optionally, saved for the user. We will start with a small number of stories for users to choose from, but it will eventually allow users to create their own stories.

## Requirements
For the MVP, the app will:
1. ask users which story they would like to write based on the stories contained in a directory with the app
  * This directory can be either directly _with_ the app or inside a `stories` directory.
1. prompt users to enter various parts of speech, numbers, and make a selection from pre-selected values (like seasons or days of the week or whatever the story has picked).
1. provide error checking on the entries where possible.
1. print out the completed story. 
1. be able to save a story should the user want that.

For an upgrade, the app will:
1. allow a user to add new stories by performing checks on a new story when the user picks it. 
  * This allows us to enforce required values in the story.
  * Gives the user a way to add their own stories
1. allow the pre-selected values to have multiple selections

## Examples of types

* Number (`/[0-9]+/`)
* Date (`/\d{2}-\d{2}-\d{4}/`)
* Value picker (single or, eventually, multiple values)
* Parts of speech (where this is `/[a-zA-Z]+/`)

## Sample user flow

```
node madlibs.js

Mad Libs!
Let's create a something fun. What story do you want to tell today?
[X] going to the zoo
[ ] writing code in a homogenous echo chamber
[ ] doing agility with a scared pupy
[ ] watching paint dry
---

Great! Let's do a trip to the zoo.
Enter a verb:
> crawl
Enter a number:
> yes
Oops! That's not a number. Please enter a number:
> 6
Choose a season:
[ ] winter
[ ] spring
[X] summer
[ ] fall
Last one! Enter a noun:
> asdf
---

Here's your story. Do you want to save your story? [y/N]
N

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum ultricies aliquam. Cras elit velit, ultrices ut maximus eu, mattis suscipit eros. Donec commodo vitae velit at pellentesque. Aenean mollis odio sit amet nibh vehicula gravida. Cras vitae ultricies dui. Nulla facilisi. Vestibulum malesuada nisl id quam blandit auctor. Donec ac tincidunt velit. Nam venenatis, ante at tristique faucibus, ante massa condimentum felis, a tincidunt leo sem eget lacus. Aliquam et aliquam mauris. Suspendisse nisi enim, condimentum at molestie eu, lobortis sed diam. Maecenas ac dictum nibh, in volutpat mauris. Praesent in mi ut diam dictum suscipit in eget ex. Aenean imperdiet, elit non malesuada porttitor, velit libero ornare diam, non porta massa nisl eu arcu. Nunc varius cursus nunc ut luctus.
```

## Sample Madlibs File
