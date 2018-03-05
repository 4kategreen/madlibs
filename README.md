# Madlibs 

## Code

The app will take user input create a madlib with it.

### Sample game dialog

1. What do you want to tell a story about? (Choose from a list)
1. Great! Let's get started. Enter a verb. 
1. Enter a number
1. Enter a city. 
1. Last one. Enter a plural noun.
1. Here's your story!

### Input possibilities

* String
* Number
* List
* Multiple select list?

### Requirements
A CLI-driven madlib generator to play with your friends. Default story is included.

* File that the user can create to make their own mad lib
  * Structure TBD
* Existing files so a user can just start playing (and make good examples)
* Have the ability to add new files
* A CLI-based questioning tool that can catch errors at the time of input

### Bug
New mad lib file breaks it

### Feature
Add the ability to let the user add stories (and story types)

* Add CLI to choose among many stories
* Add code to add new stories
* Add code to add new input types

## Workshop Details

2 hours

### Required Discussion Elements

* What are unit tests?
* Spectrum of tests
  * Unit tests
  * Integration tests
  * End-to-end tests
* Sample walkthrough using real world example?
  * Data storage system
    * Website to enter and edit data
    * Form validation to catch bad data entry
    * API which actually modifies the database
  * Units test on form validation and the API
  * Integration test against the form validation and API
  * E2E tests would be like a user: 
    * working from the website itself and verifying the expected outcome
* Code changes for unit testing
  * Smaller, well-defined functions
  * Simple input and output
  * No external state
  * Repeatibility: call the same function with same input and get the same result
* Why do they help us?
  * Quicker fixes for bugs and building new features
  * Ensure code quality
  * Logic is built in
* What unit tests should look like
  * not a lot of logic in the tests
  * one or more assertions
  * mocking where it's needed
* Walk through one method of the class
* Coding time

### Required Code Elements

* Class to add unit tests to
* Feature request
* Bug
* Advanced coding challenge